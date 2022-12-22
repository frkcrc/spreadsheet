import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './Scrollbar.module.scss';

const Scrollbar = props => {

  const barRef = useRef();
  const [barHash, setBarHash] = useState(''); // View hash in use.
  const [viewLength, setViewLength] = useState(0);
  const [lastPos, setLastPos] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pointerId, setPointerId] = useState(undefined);
  const [jump, setJump] = useState(false);

  const {axis} = props;
  const isX = axis === 'x'; // Convenience for direction checks.

  // Extract the relevant state.
  const {viewHash, view} = useSelector((state) => {
    const id = state.spreadsheet.selected;
    const view = state.spreadsheet.sheets[id].view;
    return {
      viewHash: view.hash,
      view: (isX ? view.cols : view.rows),
    };
  });
  const dispatch = useDispatch();

  // Calculate derived properties.
  const troughLength = viewLength - 8; // View - padding.
  const visibleSlice = viewLength / view.total; // Visible piece of sheet.
  const size = visibleSlice >= 1 ? 0 : (troughLength * visibleSlice);
  const offsetPx = offset * troughLength;

  // Effect to set the size responsively.
  useLayoutEffect(() => {
    const calculateSize = () => {
      const bar = barRef.current;
      setViewLength(isX ? bar.clientWidth : bar.clientHeight);
    };
    calculateSize();
    window.addEventListener('resize', calculateSize);
    return _ => window.removeEventListener('resize', calculateSize);
  }, [isX, barRef]);

  // Effect to reset the scrollbar when the view changes.
  useEffect(() => {
    if (barHash !== viewHash) {
      setBarHash(viewHash);
      setOffset(view.boundaries[view.start]);
    }
  }, [viewHash, barHash, view.boundaries, view.start, troughLength]);

  // Effect to set the view starting point according to offset changes.
  useEffect(() => {
    if (barHash != viewHash) // Don't run if the bar has to reset.
      return;
    let start = 0;
    while (offset > view.boundaries[start])
      start++;
    const payload = { [isX? 'col' : 'row']: start };
    //checkOffset(offset);
    dispatch(spreadsheetActions.setViewStart(payload));
  }, [offset, isX, view.boundaries, dispatch, barHash, viewHash]);

  // Event handlers.

  const startDraggingHandler = e => {
    setPointerId(e.pointerId);
    setLastPos(isX ? e.clientX : e.clientY);
    e.target.setPointerCapture(e.pointerId);
  };

  const stopDraggingHandler = e => {
    e.target.releasePointerCapture(pointerId);
    setPointerId(undefined);
  };

  const draggingHandler = e => {
    if (!pointerId) return;
    const currentPos = (isX ? e.clientX : e.clientY);
    const maxOffset = 1 - visibleSlice;
    const delta = (currentPos - lastPos) / troughLength;
    setOffset((old) => Math.min(maxOffset, Math.max(0, old + delta)));
    setLastPos(currentPos);
  };

  const troughClickHandler = e => {
    // Check target to ignore handle clicks.
    if (e.target === barRef.current) {
      // Calculate the offset that would position the *center* of the 
      // handle at the clicked point (within boundaries).
      const bcr = barRef.current.getBoundingClientRect();
      const relativeCoordinate = (
        isX ? e.clientX - (bcr.left + 4) : e.clientY - (bcr.top + 4)
      );
      const relativeOffset = relativeCoordinate / troughLength;
      const targetOffset = relativeOffset - (visibleSlice / 2);
      setOffset(
        Math.min(1 - visibleSlice, Math.max(0, targetOffset))
      );
      // Set the transition class and timeout its removal.
      setJump(true);
      setTimeout(() => {
        setJump(false);
      }, 200);
    }
  };

  // Build handle styles.
  const handleStyle = {};
  if (isX) {
    handleStyle.width = size;
    handleStyle.left = offsetPx + 'px';
  } else {
    handleStyle.height = size;
    handleStyle.top = offsetPx + 'px';
  }

  // Build handle classlist.
  const handleClasses = [styles.handle];
  if (jump) { // Transition CSS class, only active on click.
    handleClasses.push(styles.jump);
  }

  return (
    <div
      className={styles[axis]}
      ref={barRef}
      onClick={troughClickHandler}
    >
      <div
        className={handleClasses.join(' ')}
        style={handleStyle}
        onPointerDown={startDraggingHandler}
        onPointerUp={stopDraggingHandler}
        onPointerCancel={stopDraggingHandler}
        onContextMenu={stopDraggingHandler} // To stop dragging on right click.
        onPointerMove={draggingHandler}
      ></div>
    </div>
  );
};

export default Scrollbar;
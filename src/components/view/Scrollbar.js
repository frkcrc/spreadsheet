import { useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './Scrollbar.module.scss';

const Scrollbar = props => {

  const barRef = useRef();
  const [barAnchor, setBarAnchor] = useState(0);
  const [handleAnchor, setHandleAnchor] = useState(0);
  const [pointerId, setPointerId] = useState(undefined);
  const [jump, setJump] = useState(false);

  const {axis} = props;
  const isX = axis === 'cols'; // Convenience for direction checks.

  // Extract the relevant state.
  const id = useSelector(state => state.spreadsheet.selected);
  const total = useSelector(state => 
    state.spreadsheet.sheets[id].view[axis].total);
  const offset = useSelector(state => 
    state.spreadsheet.sheets[id].view[axis].offset);
  const viewSize = useSelector(state => 
    state.spreadsheet.viewport[isX ? 'width' : 'height']);
  const dispatch = useDispatch();

  // Calculate derived properties.
  const troughLength = viewSize - 8; // View - padding.
  const visibleSlice = viewSize / total; // Visible fraction of sheet.
  const ratio = total / troughLength; // Ratio between doc and bar size.
  const offsetSize = (offset / total) * troughLength;
  const handleSize = visibleSlice >= 1 ? 0 : (troughLength * visibleSlice);

  // Effect to set the size responsively.
  useLayoutEffect(() => {
    const calculate = () => {
      const bcr = barRef.current.getBoundingClientRect();
      setBarAnchor(isX ? (bcr.left + 4) : (bcr.top + 4));
    };
    calculate();
    window.addEventListener('resize', calculate);
    return _ => window.removeEventListener('resize', calculate);
  }, [isX, barRef]);

  // Positions the bar at the given position.
  const positionScrollbar = (position, anchor) => {
    const onBarPos = position - barAnchor;
    const targetOffset = onBarPos - anchor;
    const delta = (targetOffset - offsetSize) * ratio;
    dispatch(spreadsheetActions.addOffset({
      axis,
      delta
    }));
  }

  // Event handlers.

  const startDraggingHandler = e => {
    // Find the position of the mouse on the handle.
    const positionOnHandle = 
      (isX ? e.clientX : e.clientY) - (barAnchor + offsetSize);
    setHandleAnchor(positionOnHandle);
    setPointerId(e.pointerId);
    e.target.setPointerCapture(e.pointerId);
  };

  const stopDraggingHandler = e => {
    e.target.releasePointerCapture(pointerId);
    setPointerId(undefined);
  };

  const draggingHandler = e => {
    if (pointerId === undefined) return;
    positionScrollbar(isX ? e.clientX : e.clientY, handleAnchor);
  };

  const troughClickHandler = e => {
    // Check target to ignore handle clicks.
    if (e.target === barRef.current) {
      positionScrollbar(isX ? e.clientX : e.clientY, handleSize/2);
      setJump(true);
      setTimeout(() => {
        setJump(false);
      }, 200);
    }
  };

  // Build handle styles.
  const handleStyle = {};
  if (isX) {
    handleStyle.width = handleSize;
    handleStyle.left = offsetSize + 'px';
  } else {
    handleStyle.height = handleSize;
    handleStyle.top = offsetSize + 'px';
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
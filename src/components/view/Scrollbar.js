import { useState, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Scrollbar.module.scss';

const Scrollbar = props => {

  const barRef = useRef();
  const [viewLength, setViewLength] = useState(0);
  const [lastPos, setLastPos] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pointerId, setPointerId] = useState(undefined);
  const [jump, setJump] = useState(false);

  const {axis} = props;
  const isX = axis === 'x'; // Convenience for direction checks.

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

  // Extract the relevant state.
  const view = useSelector((state) => {
    const id = state.spreadsheet.selected;
    const view = state.spreadsheet.sheets[id].view;
    return (isX ? view.cols : view.rows);
  });

  // Calculate derived properties.
  const troughLength = viewLength - 8; // View - padding.
  const visibleSlice = viewLength / view.total; // Visible piece of sheet.
  const size = visibleSlice >= 1 ? 0 : (troughLength * visibleSlice);
  const offsetPx = offset * troughLength;

  // Build styles.
  const handleStyle = {};
  if (isX) {
    handleStyle.width = size;
    handleStyle.left = offsetPx + 'px';
  } else {
    handleStyle.height = size;
    handleStyle.top = offsetPx + 'px';
  }

  // Build classes for the handle.
  const handleClasses = [styles.handle];
  if (jump) { // Transition CSS class, only active on click.
    handleClasses.push(styles.jump);
  }

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
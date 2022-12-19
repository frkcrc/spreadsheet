import { useState, useRef, useLayoutEffect } from 'react';
import styles from './Scrollbar.module.scss';

const Scrollbar = props => {

  const scrollbarRef = useRef();
  const [troughLength, setTroughLength] = useState(0);
  const [lastPos, setLastPos] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pointerId, setPointerId] = useState(undefined);

  const {axis, view} = props;

  // Calculate dimensions and style the handler.
  // The view prop is the fraction of the sheet that can be shown at once;
  // the handle of the scrollbar will the same fraction of the length.
  const size = (view >= 1 ? 0 : troughLength * view);
  const offsetPx = offset * troughLength;
  const handleStyle = {};
  if (axis === 'x') {
    handleStyle.width = size;
    handleStyle.left = offsetPx + 'px';
  } else {
    handleStyle.height = size;
    handleStyle.top = offsetPx + 'px';
  }

  // Effect to update the length on render and on resize.
  // When the window is resized, the troughLength is recalculated and
  // everything else adapts as the component gets re-rendered.
  useLayoutEffect(() => {
    const calculate = () => {
      // The subtracted values are the padding.
      if (axis === 'x') {
        setTroughLength(scrollbarRef.current.clientWidth - 8);
      } else {
        setTroughLength(scrollbarRef.current.clientHeight - 8);
      }
    };
    calculate();
    window.addEventListener('resize', calculate);
    return _ => window.removeEventListener('resize', calculate);
  }, [axis, scrollbarRef]);

  const startDraggingHandler = event => {
    setPointerId(event.pointerId);
    setLastPos(
      (axis === 'x' ? event.clientX : event.clientY)
    );
    event.target.setPointerCapture(event.pointerId);
  };

  const stopDraggingHandler = event => {
    event.target.releasePointerCapture(pointerId);
    setPointerId(undefined);
  };

  const draggingHandler = event => {
    if (!pointerId) return;
    const currentPos = 
      (axis === 'x' ? event.clientX : event.clientY);
    const maxOffset = 1 - view;
    const delta = (currentPos - lastPos) / troughLength;
    setOffset((oldOffset) => {
      const newOffset = oldOffset+delta;
      return Math.min(maxOffset, Math.max(0, newOffset));
    });
    setLastPos(currentPos);
    // TODO: Add callback to notify the view when the user scrolls.
  };

  return (
    <div className={styles[axis]} ref={scrollbarRef}>
      <div
        className={styles.handle}
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
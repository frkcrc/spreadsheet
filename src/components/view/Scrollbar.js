import { useState, useRef } from 'react';
import styles from './Scrollbar.module.scss';

const Scrollbar = props => {

  const scrollbarRef = useRef();
  const [lastPos, setLastPos] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pointerId, setPointerId] = useState(undefined);

  const {axis, size} = props;

  const handleStyle = {};
  if (axis === 'x') {
    handleStyle.width = size;
    handleStyle.left = offset + 'px';
  } else {
    handleStyle.height = size;
    handleStyle.top = offset + 'px';
  }

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
    const maxOffset = 
      (axis === 'x' ? 
        scrollbarRef.current.clientWidth - size - 8 : 
        scrollbarRef.current.clientHeight - size - 8 );
    const delta = currentPos - lastPos;
    setOffset((oldOffset) => {
      const newOffset = oldOffset+delta;
      return Math.min(maxOffset, Math.max(0, newOffset));
    });
    setLastPos(currentPos);
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
import { useState } from 'react';
import styles from './Scrollbar.module.scss';

const Scrollbar = props => {

  const [lastPos, setLastPos] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pointerId, setPointerId] = useState(undefined);

  const orientation = props.orientation;

  const handleStyle = {};
  if (orientation === 'horizontal') {
    handleStyle.width = props.size;
    handleStyle.left = offset + 'px';
  } else {
    handleStyle.height = props.size;
    handleStyle.top = offset + 'px';
  }

  const startDraggingHandler = event => {
    setPointerId(event.pointerId);
    setLastPos(
      (orientation === 'horizontal' ? event.clientX : event.clientY)
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
      (orientation === 'horizontal' ? event.clientX : event.clientY);
    const delta = currentPos - lastPos;
    setOffset((oldOffset) => {
      const newOffset = oldOffset+delta;
      return (newOffset >= 0 ? newOffset : 0);
    });
    setLastPos(currentPos);
  };

  return (
    <div className={styles[orientation]}>
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
import { useState } from 'react';
import styles from './Handle.module.scss';

const Handle = props => {

  const [pointerId, setPointerId] = useState(undefined);
  const [startPos, setStartPos] = useState(undefined);
  const [handlerOffset, setHandlerOffset] = useState(0);

  const type = props.type;
  const isCol = type === 'col';
  const className = styles[`handle${type}`];
  const inlineStyles = {};
  if (isCol) inlineStyles.right = `${-handlerOffset}px`;
  else inlineStyles.bottom = `${-handlerOffset}px`;

  // Handlers.
  const startDraggingHandler = e => {
    setStartPos(isCol ? e.clientX : e.clientY);
    setPointerId(e.pointerId);
    e.target.setPointerCapture(e.pointerId);
  };

  const stopDraggingHandler = e => {
    if (pointerId !== undefined)
      e.target.releasePointerCapture(pointerId);
    setPointerId(undefined);
    setHandlerOffset(0);
    // TODO: Actual resizing of the row/col here.
  };

  const draggingHandler = e => {
    if (pointerId === undefined) return;
    if (isCol) {
      setHandlerOffset(e.clientX - startPos);
    } else {
      setHandlerOffset(e.clientY - startPos);
    }
  };

  return (
    <div 
      className={className}
      style={inlineStyles}
      onPointerDown={startDraggingHandler}
      onPointerUp={stopDraggingHandler}
      onPointerCancel={stopDraggingHandler}
      onContextMenu={stopDraggingHandler} // To stop dragging on right click.
      onPointerMove={draggingHandler}
    >

    </div>
  );
};
export default Handle;
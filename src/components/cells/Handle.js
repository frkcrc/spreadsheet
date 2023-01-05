import { useState } from 'react';
import { minColWidth, minRowHeight } from '../../helpers/constants';
import styles from './Handle.module.scss';

const Handle = props => {

  const [pointerId, setPointerId] = useState(undefined);
  const [startPos, setStartPos] = useState(undefined);
  const [handlerOffset, setHandlerOffset] = useState(0);

  const type = props.type;
  const size = props.size;
  const isCol = type === 'col';

  const classes = [styles[`handle${type}`]];
  if (handlerOffset !== 0)
    classes.push(styles.dragging);

  // Set inline styles for positioning while dragging. 
  const inlineStyles = {};
  if (isCol) {
    const offset = Math.min(size - minColWidth, -handlerOffset);
    inlineStyles.right = `${offset}px`;
  } else {
    const offset = Math.min(size - minRowHeight, -handlerOffset);
    inlineStyles.bottom = `${offset}px`;
  }

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
    if (isCol) {
      const offset = Math.max(size - minColWidth, handlerOffset);
      // TODO: Actually resize.
    } else {
      const offset = Math.max(size - minRowHeight, handlerOffset);
      // TODO: Actually resize.
    }
    setHandlerOffset(0);
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
      className={classes.join(' ')}
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
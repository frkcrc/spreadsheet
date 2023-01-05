import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { minColWidth, minRowHeight } from '../../helpers/constants';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './Handle.module.scss';

const Handle = props => {

  const dispatch = useDispatch();

  const [pointerId, setPointerId] = useState(undefined);
  const [startPos, setStartPos] = useState(undefined);
  const [handlerOffset, setHandlerOffset] = useState(0);

  const type = props.type;
  const cell = props.cell;
  const isCol = type === 'col';
  const size = (isCol ? cell.width : cell.height);
  const id = (isCol ? cell.col : cell.row);

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
      dispatch(spreadsheetActions.resizeColumn({
        index: id,
        width: Math.max(size + handlerOffset, minColWidth)
      }));
    } else {
      dispatch(spreadsheetActions.resizeRow({
        index: id,
        height: Math.max(size + handlerOffset, minRowHeight)
      }));
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
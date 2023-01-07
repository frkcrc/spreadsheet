import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import EditingBox from './EditingBox';
import Handle from './Handle';
import styles from './Cell.module.scss';

const Cell = props => {

  const cellRef = useRef();
  const editing = props.editing;
  const dispatch = useDispatch();
  const cell = props.cell;

  // Build classes for the cell.
  const classes = [styles.cell];
  if (props.head) { classes.push(styles.head); }
  if (props.selected) {
    classes.push(styles.selected); 
  } else if (props.multiselected) {
    classes.push(styles.multiselected);
    if (props.borders?.top) { classes.push(styles.multiselectedTop); }
    if (props.borders?.bottom) { classes.push(styles.multiselectedBottom); }
    if (props.borders?.left) { classes.push(styles.multiselectedLeft); }
    if (props.borders?.right) { classes.push(styles.multiselectedRight); }
  }

  const style = {
    width: cell.width,
    height: cell.height,
  };

  // Build the editing box if in editing mode.
  let editingBox = null;
  if (props.selected && editing){
    const bcr = cellRef.current.getBoundingClientRect();
    editingBox = (
      <EditingBox
        x={bcr.left}
        y={bcr.top}
        cell={cell}
      />
    );
  }

  // Handlers

  const contextMenuHandler = e => {
    dispatch(spreadsheetActions.setPopup({
      show: true, 
      data: {
        anchor: { x: e.clientX, y: e.clientY },
        type: (props.head || 'cell'),
        payload: cell
      }
    }));
  };

  const doubleClickHandler = e => {
    dispatch(spreadsheetActions.setEditing());
  };

  return (
    <div
      ref={cellRef}
      className={classes.join(' ')}
      style={style}
      onPointerDown={e => props.pointerDown?.(e, cell)}
      onPointerEnter={() => props.pointerEnter?.(cell)}
      onPointerUp={() => props.pointerUp?.(cell)}
      onContextMenu={contextMenuHandler}
      onDoubleClick={doubleClickHandler}
    >
      {cell.content}
      {props.head && 
        <Handle
          type={props.head}
          cell={cell}
        />}
      {editingBox}
    </div>
  );
};

export default Cell;
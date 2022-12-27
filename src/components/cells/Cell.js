import { useDispatch } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './Cell.module.scss';

const Cell = props => {

  const dispatch = useDispatch();
  const cell = props.cell;

  // Build classes for the cell.
  const classes = [styles.cell];
  if (props.head) { classes.push(styles.head); }
  if (props.multiselected) { classes.push(styles.multiselected); }
  if (props.selected) {
    classes.push(styles.selected); 
  } else if (props.multiselected) {
    if (props.borders?.top) { classes.push(styles.multiselectedTop); }
    if (props.borders?.bottom) { classes.push(styles.multiselectedBottom); }
    if (props.borders?.left) { classes.push(styles.multiselectedLeft); }
    if (props.borders?.right) { classes.push(styles.multiselectedRight); }
  }

  const style = {
    width: cell.width,
    height: cell.height,
  };

  // Handlers

  const contextMenuHandler = e => {
    dispatch(spreadsheetActions.setPopup({
      show: true, 
      data: {
        anchor: { x: e.clientX, y: e.clientY },
        type: (props.head || 'cell')
      }
    }));
  };

  return (
    <div
      className={classes.join(' ')}
      style={style}
      onPointerDown={e => props.pointerDown?.(e, cell)}
      onPointerEnter={() => props.pointerEnter?.(cell)}
      onPointerUp={() => props.pointerUp?.(cell)}
      onContextMenu={contextMenuHandler}
    >{cell.content}</div>
  );
};

export default Cell;
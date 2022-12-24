import styles from './Cell.module.scss';

const Cell = props => {

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

  return (
    <div
      className={classes.join(' ')}
      style={style}
      onPointerDown={() => props.pointerDown?.(cell)}
      onPointerEnter={() => props.pointerEnter?.(cell)}
      onPointerUp={() => props.pointerUp?.(cell)}
    >{cell.content}</div>
  );
};

export default Cell;
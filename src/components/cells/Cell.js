import styles from './Cell.module.scss';

const Cell = props => {

  const cell = props.cell;

  // Build classes for the cell.
  const classes = [styles.cell];
  if (props.head) { classes.push(styles.head); }
  if (props.selected) { classes.push(styles.selected); }

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
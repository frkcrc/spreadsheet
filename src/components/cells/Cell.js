import styles from './Cell.module.scss';

const Cell = props => {

  const cell = props.cell;

  // Build classes for the cell.
  const classes = [styles.cell];
  if (props.head) {
    classes.push(styles.head);
  }

  const style = {
    width: cell.width,
    height: cell.height,
  };

  return (
    <div
      className={classes.join(' ')}
      style={style}
    >{cell.content}</div>
  );
};

export default Cell;
import styles from './Cell.module.scss';

const Cell = props => {

  const cell = props.cell;

  const classes = `${styles.cell} ${props.head && styles.head}`;

  const style = {
    width: cell.width,
    height: cell.height,
  };

  return (
    <div
      className={classes}
      style={style}
    >{cell.content}</div>
  );
};

export default Cell;
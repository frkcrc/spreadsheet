import styles from './Cell.module.css';

const Cell = props => {

  const classes = `${styles.cell} ${props.head && styles.head}`;

  const style = {
    width: props.width,
    height: props.height,
  };

  return (
    <div
      className={classes}
      style={style}
    ></div>
  );
};

export default Cell;
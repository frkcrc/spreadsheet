import styles from './Cell.module.css';

const Cell =  props => {

  const style = {
    width: props.width,
    height: props.height,
  };

  return (
    <div
      className={styles.cell}
      style={style}
    ></div>
  );
};

export default Cell;
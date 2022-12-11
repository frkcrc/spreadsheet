import Cell from './Cell';
import styles from './Row.module.css';

const Row = () => {
  return (
    <div className={styles.row}>
      {new Array(15).fill(<Cell />)}
    </div>
  );
};

export default Row;
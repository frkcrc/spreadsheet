import Row from './Row';
import styles from './SheetView.module.css';

const SheetView = () => {
  return (
    <div className={styles.sheetPane}>
      {new Array(18).fill(<Row />)}
    </div>
  );
};

export default SheetView;
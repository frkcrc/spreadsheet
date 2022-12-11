import Row from './pane/Row';
import styles from './SheetPane.module.css';

const SheetPane = () => {
  return (
    <div className={styles.sheetPane}>
      {new Array(18).fill(<Row />)}
    </div>
  );
};

export default SheetPane;
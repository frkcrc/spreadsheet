import styles from './SheetBar.module.scss';

const SheetBar = () => {
  return (
    <div className={styles.sheetBar}>
        <div className={styles.addButton}>
          <button type="button">+</button>
        </div>
    </div>
  )
};

export default SheetBar;
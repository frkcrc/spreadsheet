import styles from './SheetBar.module.scss';

const SheetBar = () => {
  return (
    <div className={styles.sheetBar}>
        <div className={styles.addButton}>
          <button type="button">+</button>
        </div>
        <div className={styles.sheetSelector}>
          <span>Sheet 1</span>
        </div>
        <div className={styles.sheetSelectorActive}>
          <span>Sheet 2</span>
        </div>
        <div className={styles.sheetSelector}>
          <span>Sheet 3</span>
        </div>
        <div className={styles.sheetSelector}>
          <span>Sheet 4</span>
        </div>
    </div>
  )
};

export default SheetBar;
import { useSelector } from 'react-redux';
import styles from './SheetBar.module.scss';

const SheetBar = () => {

  const spreadsheet = useSelector((state) => state.spreadsheet.current);
  const selected = spreadsheet.selected;

  const getClass = (i) =>
    selected === i ? styles.sheetSelectorActive : styles.sheetSelector;

  return (
    <div className={styles.sheetBar}>
        <div className={styles.addButton}>
          <button type="button">+</button>
        </div>
        {spreadsheet.sheets.map((s, i) => 
          <div className={getClass(i)}>
            <span>{s.name}</span>
          </div>
        )}
    </div>
  )
};

export default SheetBar;
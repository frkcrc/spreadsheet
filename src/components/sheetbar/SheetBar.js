import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './SheetBar.module.scss';

const SheetBar = () => {

  const selected = useSelector((state) => state.spreadsheet.selected);
  const sheets = useSelector((state) => state.spreadsheet.sheets);
  const dispatch = useDispatch();

  const newSheet = () => {
    dispatch(spreadsheetActions.newSheet());
  };

  const selectSheet = (i) => {
    if (i === selected)
      return;
    dispatch(spreadsheetActions.selectSheet(i));
  };

  const getClass = (i) =>
    selected === i ? styles.sheetSelectorActive : styles.sheetSelector;

  return (
    <div className={styles.sheetBar}>
        <div className={styles.addButton}>
          <button
            type="button"
            onClick={newSheet}
          >+</button>
        </div>
        <div className={styles.selectorsContainer}>
          {sheets.map((s, i) => 
            <div
              className={getClass(i)}
              onClick={() => selectSheet(i)}
              key={i}
            >
              <span>{s.name}</span>
            </div>
          )}
        </div>
        
    </div>
  )
};

export default SheetBar;
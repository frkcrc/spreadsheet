import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './SheetBar.module.scss';

const SheetBar = () => {

  const dispatch = useDispatch();

  const spreadsheet = useSelector((state) => state.spreadsheet);
  const selected = spreadsheet.selected;

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
          <button type="button">+</button>
        </div>
        {spreadsheet.sheets.map((s, i) => 
          <div
            className={getClass(i)}
            onClick={() => selectSheet(i)}
            key={i}
          >
            <span>{s.name}</span>
          </div>
        )}
    </div>
  )
};

export default SheetBar;
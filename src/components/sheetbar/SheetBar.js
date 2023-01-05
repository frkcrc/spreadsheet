import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './SheetBar.module.scss';
import SheetButton from './SheetButton';

const SheetBar = () => {

  const selected = useSelector((state) => state.spreadsheet.selected);
  const sheets = useSelector((state) => state.spreadsheet.sheets);
  const dispatch = useDispatch();

  const newSheet = () => {
    dispatch(spreadsheetActions.newSheet());
  };

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
            <SheetButton 
              key={i}
              id={i}
              selected={i===selected}
              name={s.name}
            />
          )}
        </div>
        
    </div>
  )
};

export default SheetBar;
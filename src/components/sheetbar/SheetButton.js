import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './SheetButton.module.scss';

const SheetButton = props => {

  const sheetID = props.id;
  const selected = props.selected;
  const name = props.name;
  const dispatch = useDispatch();

  const selectHandler = () => {
    if (!selected)
      dispatch(spreadsheetActions.selectSheet(sheetID));
  };

  const cssClass = 
    selected ? styles.sheetSelectorActive : styles.sheetSelector;

  return (
    <div
      className={cssClass}
      onClick={selectHandler}
    >
      <span>{name}</span>
    </div>
  )
};

export default SheetButton;
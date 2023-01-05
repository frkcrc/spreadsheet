import { useDispatch } from 'react-redux';
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

  const contextMenuHandler = e => {
    dispatch(spreadsheetActions.setPopup({
      show: true, 
      data: {
        anchor: { x: e.clientX, y: e.clientY },
        type: 'sheet',
        payload: sheetID
      }
    }));
  };

  const cssClass = 
    selected ? styles.sheetSelectorActive : styles.sheetSelector;

  return (
    <div
      className={cssClass}
      onClick={selectHandler}
      onContextMenu={contextMenuHandler}
    >
      <span>{name}</span>
    </div>
  )
};

export default SheetButton;
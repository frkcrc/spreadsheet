import { useDispatch } from "react-redux";
import { spreadsheetActions } from "../../store/spreadsheet";
import PopupList from "./PopupList";
import PopupListItem from "./PopupListItem";

const CellPopup = props => {

  const dispatch = useDispatch();
  const {row, col} = props.payload;

  const removeRow = () => {
    dispatch(spreadsheetActions.removeRow(row));
  };

  const clearRow = () => {
    dispatch(spreadsheetActions.clearRow(row));
  };

  const removeCol = () => {
    dispatch(spreadsheetActions.removeColumn(col));
  };

  const clearCol = () => {
    dispatch(spreadsheetActions.clearColumn(col));
  };


  return (
    <PopupList>
      <PopupListItem
        label="Clear Cell"
      />
      <PopupListItem
        label="Clear Selection"
      />
      <PopupListItem
        label="Clear Row"
        onClick={clearRow}
      />
      <PopupListItem
        label="Clear Column"
        onClick={clearCol}
      />
      <PopupListItem
        label="Remove Row"
        onClick={removeRow}
      />
      <PopupListItem
        label="Remove Column"
        onClick={removeCol}
      />
    </PopupList>
  )
};
export default CellPopup;
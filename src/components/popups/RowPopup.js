import { useDispatch } from "react-redux";
import { spreadsheetActions } from "../../store/spreadsheet";
import PopupList from "./PopupList";
import PopupListItem from "./PopupListItem";

const RowPopup = props => {

  const dispatch = useDispatch();
  const row = props.payload.row;

  // Handlers.

  const addAbove = () => {
    dispatch(spreadsheetActions.addRow(row));
  };

  const addBelow = () => {
    dispatch(spreadsheetActions.addRow(row + 1));
  };

  const removeRow = () => {
    dispatch(spreadsheetActions.removeRow(row));
  };

  const clearRow = () => {

  };

  return (
    <PopupList>
      <PopupListItem
        label="Add Row Above"
        onClick={addAbove}
      />
      <PopupListItem
        label="Add Row Below"
        onClick={addBelow}
      />
      <PopupListItem
        label="Remove Row"
        onClick={removeRow}
      />
      <PopupListItem
        label="Clear Row"
        onClick={clearRow}
      />
    </PopupList>
  )
};
export default RowPopup;
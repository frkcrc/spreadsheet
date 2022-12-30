import { useDispatch } from "react-redux";
import { spreadsheetActions } from "../../store/spreadsheet";
import PopupList from "./PopupList";
import PopupListItem from "./PopupListItem";

const ColPopup = props => {

  const dispatch = useDispatch();
  const column = props.payload.col;

  // Handlers.

  const addLeft = () => {
    dispatch(spreadsheetActions.addColumn(column));
  };

  const addRight = () => {
    dispatch(spreadsheetActions.addColumn(column + 1));
  };

  const removeCol = () => {
    dispatch(spreadsheetActions.removeColumn(column));
  };

  const clearCol = () => {

  };

  return (
    <PopupList>
      <PopupListItem
        label="Add Column Left"
        onClick={addLeft}
      />
      <PopupListItem
        label="Add Column Right"
        onClick={addRight}
      />
      <PopupListItem
        label="Remove Column"
        onClick={removeCol}
      />
      <PopupListItem
        label="Clear Column"
        onClick={clearCol}
      />
    </PopupList>
  )
};
export default ColPopup;
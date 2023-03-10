import { useDispatch } from "react-redux";
import { spreadsheetActions } from "../../store/spreadsheet";
import PopupList from "./PopupList";
import PopupListItem from "./PopupListItem";

const SheetPopup = props => {

  const id = props.payload;
  const dispatch = useDispatch();

  // Handlers.

  const deleteHandler = () => {
    dispatch(spreadsheetActions.removeSheet(id));
  };

  return (
    <PopupList>
      <PopupListItem
        label="Delete"
        onClick={deleteHandler}
      />
    </PopupList>
  )
};
export default SheetPopup;
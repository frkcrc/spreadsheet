import { useDispatch } from "react-redux";
import { spreadsheetActions } from "../../store/spreadsheet";
import PopupList from "./PopupList";
import PopupListItem from "./PopupListItem";

const SheetPopup = props => {

  const dispatch = useDispatch();

  // Handlers.

  const renameHandler = () => {
  };

  const deleteHandler = () => {

  };

  return (
    <PopupList>
      <PopupListItem
        label="Rename"
        onClick={renameHandler}
      />
      <PopupListItem
        label="Delete"
        onClick={deleteHandler}
      />
    </PopupList>
  )
};
export default SheetPopup;
import { useDispatch } from "react-redux";
import PopupList from "./PopupList";
import PopupListItem from "./PopupListItem";

const ColPopup = props => {

  const dispatch = useDispatch();
  const column = props.payload.col;

  // Handlers.

  const addLeft = () => {
    
  };

  const addRight = () => {

  };

  const removeCol = () => {

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
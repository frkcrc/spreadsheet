import PopupList from "./PopupList";
import PopupListItem from "./PopupListItem";

const ColPopup = () => {
  return (
    <PopupList>
      <PopupListItem
        label="Add Column Left"
      />
      <PopupListItem
        label="Add Column Right"
      />
      <PopupListItem
        label="Remove Column"
      />
      <PopupListItem
        label="Clear Column"
      />
    </PopupList>
  )
};
export default ColPopup;
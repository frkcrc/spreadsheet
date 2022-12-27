import PopupList from "./PopupList";
import PopupListItem from "./PopupListItem";

const CellPopup = () => {
  return (
    <PopupList>
      <PopupListItem
        label="Sample Item"
      />
      <PopupListItem
        label="Anotehr Sample Item"
      />
    </PopupList>
  )
};
export default CellPopup;
import { useSelector } from "react-redux";
import EditingBox from "./EditingBox";

const EditingContainer = () => {

  const isEditing = useSelector(state => !!state.spreadsheet.editing.cell);

  if (!isEditing)
    return null;

  return (<EditingBox />);
};

export default EditingContainer;
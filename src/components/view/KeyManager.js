import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spreadsheetActions } from "../../store/spreadsheet";

// Handles general keystrokes events on the UI.
const KeyManager = () => {

  const dispatch = useDispatch();
  const isEditing = useSelector(state => !!state.spreadsheet.editing.cell);

  // Effect to handle keystrokes outside of editing mode.
  useEffect(() => {
    const keyHandler = e => {
      const key = e.key;
      // Handle arrow keys to move selection.
      if (!isEditing && key.startsWith('Arrow')) {
        let rowDelta = 0, colDelta = 0;
        if      (key === 'ArrowUp')    rowDelta = -1;
        else if (key === 'ArrowDown')  rowDelta = +1;
        else if (key === 'ArrowLeft')  colDelta = -1;
        else if (key === 'ArrowRight') colDelta = +1;
        dispatch(spreadsheetActions.selectMove({rowDelta, colDelta}));
      }
    };
    document.addEventListener('keydown', keyHandler);
    return _ => 
      document.removeEventListener('keydown', keyHandler);
  }, [dispatch, isEditing]);


  return null;
};

export default KeyManager;
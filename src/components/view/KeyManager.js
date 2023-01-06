import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { spreadsheetActions } from "../../store/spreadsheet";

// Handles general keystrokes events on the UI.
const KeyManager = () => {

  const dispatch = useDispatch();

  // Effect to handle keystrokes outside of editing mode.
  useEffect(() => {
    const keyHandler = e => {
      const key = e.key;
      if (key.startsWith('Arrow')) { // Arrows => Move selection.
        let rowDelta = 0, colDelta = 0;
        if      (key === 'ArrowUp')    rowDelta = -1;
        else if (key === 'ArrowDown')  rowDelta = +1;
        else if (key === 'ArrowLeft')  colDelta = -1;
        else if (key === 'ArrowRight') colDelta = +1;
        dispatch(spreadsheetActions.selectMove({rowDelta, colDelta}));
      } else if (key === 'Enter') { // Enter => Start editing.
        dispatch(spreadsheetActions.setEditing());
      }
    };
    document.addEventListener('keydown', keyHandler);
    return _ => 
      document.removeEventListener('keydown', keyHandler);
  }, [dispatch]);


  return null;
};

export default KeyManager;
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './EditingBox.module.scss';

const EditingBox = props => {

  const editRef = useRef();
  const dispatch = useDispatch();

  const {cell, x, y} = 
    useSelector(state => state.spreadsheet.editing);

  // Effect to autofocus on the input.
  useEffect(() => {
    editRef.current.focus();
  }, [editRef]);

  // Define position with inline styles.
  const inlineStyles = {
    top: y,
    left: x,
    width: `${cell.width}px`,
    height: `${cell.height}px`,
  };

  // Handlers.
  const onBlur = e => {
    dispatch(spreadsheetActions.quitEditing({
      save: true,
      content: editRef.current.value
    }));
  };

  const keyHandler = e => {
    // On Enter, save and quit editing.
    // On Esc, quit without saving.
    if (e.key === 'Enter') {
      dispatch(spreadsheetActions.quitEditing({
        save: true,
        content: editRef.current.value,
      }));
    } else if (e.key === 'Escape') {
      dispatch(spreadsheetActions.quitEditing({
        save: false,
        content: null
      }));
    }
    e.stopPropagation();
  }

  return (
    <input
      ref={editRef}
      className={styles.editbox}
      style={inlineStyles}
      onBlur={onBlur}
      onKeyDown={keyHandler}
    />
  )
}
export default EditingBox;
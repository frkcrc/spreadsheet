import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './EditingBox.module.scss';

const EditingBox = props => {

  const editRef = useRef();
  const content = useSelector(state => state.spreadsheet.editing.content);
  const dispatch = useDispatch();

  const {cell, x, y} = props;

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
  const onChangeHandler = e => {
    dispatch(spreadsheetActions.setEditingContent(e.target.value));
  };

  const onBlur = e => {
    dispatch(spreadsheetActions.quitEditing(true));
  };

  const keyHandler = e => {
    // On Enter, save and quit editing.
    // On Esc, quit without saving.
    if (e.key === 'Enter') {
      dispatch(spreadsheetActions.quitEditing(true));
      dispatch(spreadsheetActions.selectMove({
        rowDelta: 1,
        colDelta: 0
      }));
    } else if (e.key === 'Escape') {
      dispatch(spreadsheetActions.quitEditing(false));
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
      onChange={onChangeHandler}
      value={content}
    />
  )
}
export default EditingBox;
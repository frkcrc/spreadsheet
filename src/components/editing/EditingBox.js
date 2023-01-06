import { useSelector } from 'react-redux';
import styles from './EditingBox.module.scss';

const EditingBox = props => {

  const {cell, x, y} = 
    useSelector(state => state.spreadsheet.editing);

  // Define position with inline styles.
  const inlineStyles = {
    top: y,
    left: x,
    width: `${cell.width}px`,
    height: `${cell.height}px`,
  };

  return (
    <input
      className={styles.editbox}
      style={inlineStyles}
    />
  )
}
export default EditingBox;
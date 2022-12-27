import { useSelector } from 'react-redux';
import styles from './PopupContainer.module.scss';

const PopupContainer = () => {

  const popup = useSelector(state => state.spreadsheet.popup);
  const {show, data} = popup;

  const popupStyle = {
    left: data?.anchor.x,
    top: data?.anchor.y,
  };

  return (
    <div className={styles.popupContainer}>
      <div
        className={show ? styles.popupActive : styles.popup}
        style={popupStyle}
      >
        Test popup.
      </div>
    </div>
  );
};
export default PopupContainer;
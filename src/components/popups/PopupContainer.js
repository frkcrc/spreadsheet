import { useSelector } from 'react-redux';
import styles from './PopupContainer.module.scss';

const PopupContainer = () => {

  const show = useSelector(state => state.spreadsheet.popup.show);

  return (
    <div className={styles.popupContainer}>
      <div className={show ? styles.popupActive : styles.popup}>
        Test popup.
      </div>
    </div>
  );
};
export default PopupContainer;
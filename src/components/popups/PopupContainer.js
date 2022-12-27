import styles from './PopupContainer.module.scss';

const PopupContainer = () => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupActive}>
        Test popup.
      </div>
    </div>
  );
};
export default PopupContainer;
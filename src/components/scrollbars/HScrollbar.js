import styles from './HScrollbar.module.scss';

const HScrollbar = () => {
  return (
    <div className={styles.hScrollbar}>
      <div className={styles.handle}></div>
    </div>
  );
};

export default HScrollbar;
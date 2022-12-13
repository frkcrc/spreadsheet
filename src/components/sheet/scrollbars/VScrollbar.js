import styles from './VScrollbar.module.css';

const VScrollbar = () => {
  return (
    <div className={styles.vScrollbar}>
      <div className={styles.handle}></div>
    </div>
  );
};

export default VScrollbar;
import styles from './Scrollbar.module.scss';

const Scrollbar = props => {

  const orientation = props.orientation;

  return (
    <div className={styles[orientation]}>
      <div className={styles.handle}></div>
    </div>
  );
};

export default Scrollbar;
import styles from './Scrollbar.module.scss';

const Scrollbar = props => {

  const orientation = props.orientation;

  const handleStyle = {};
  if (orientation === 'horizontal') {
    handleStyle['width'] = props.size;
  } else {
    handleStyle['height'] = props.size;
  }

  return (
    <div className={styles[orientation]}>
      <div
        className={styles.handle}
        style={handleStyle}
      ></div>
    </div>
  );
};

export default Scrollbar;
import styles from './HeadingCell.module.css';

const HeadingCell =  props => {

  const style = {
    width: props.width,
    height: props.height,
  };

  return (
    <div
      className={styles.headingCell}
      style={style}
    ></div>
  );
};

export default HeadingCell;
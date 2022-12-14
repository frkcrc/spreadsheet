import styles from './Spacer.module.scss';

const Spacer = props => {

  const style = {
    width: props.width,
    height: props.height,
  };

  return (
    <div
      className={styles.spacer}
      style={style}
    ></div>
  );
};

export default Spacer;
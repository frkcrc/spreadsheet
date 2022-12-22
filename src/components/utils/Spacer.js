import styles from './Spacer.module.scss';

const Spacer = props => {

  const style = {
    width: props.width,
    height: props.height,
  };
  if (props.nb) { // nb = no bottom border
    style.borderBottom = 'none';
  }

  return (
    <div
      className={styles.spacer}
      style={style}
    ></div>
  );
};

export default Spacer;
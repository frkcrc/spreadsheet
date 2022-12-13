import styles from './Spacer.module.css';

const Spacer = props => {

  return (
    <div
      className={styles.spacer}
      style={{width: `${props.width || 50}px`}}
    ></div>
  );
};

export default Spacer;
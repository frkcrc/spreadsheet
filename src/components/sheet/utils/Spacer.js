import styles from './Spacer.module.css';

// TODO: This should take the width as prop.
// Use it to define the space of left/right.

const Spacer = props => {
  return (
    <div className={styles.spacer}></div>
  );
};

export default Spacer;
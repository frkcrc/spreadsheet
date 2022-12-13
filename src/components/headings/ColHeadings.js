import styles from './ColHeadings.module.css';
import HeadingCell from './HeadingCell';

const ColHeadings = () => {
  return (
    <div className={styles.colHeadings}>
      {new Array(15).fill(<HeadingCell width={100} height={30} />)}
    </div>
  );
};

export default ColHeadings;
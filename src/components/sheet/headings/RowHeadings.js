import HeadingCell from './HeadingCell';
import styles from './RowHeadings.module.css';

const RowHeadings = () => {
  return (
    <div className={styles.rowHeadings}>
      {new Array(18).fill(<HeadingCell />)}
    </div>
  );
};

export default RowHeadings;
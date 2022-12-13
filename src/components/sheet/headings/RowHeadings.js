import HeadingCell from './HeadingCell';
import styles from './RowHeadings.module.css';

const RowHeadings = () => {
  return (
    <div className={styles.rowHeadings}>
      {new Array(18).fill(<HeadingCell width={50} height={30}/>)}
    </div>
  );
};

export default RowHeadings;
import ColHeadings from './headings/ColHeadings';
import styles from './SheetHeader.module.css';
import Spacer from './utils/Spacer';

const SheetHeader = () => {
  return (
    <div className={styles.sheetHeader}>
      <Spacer width={50} />
      <ColHeadings />
      <Spacer width={30} />
    </div>
  );
};

export default SheetHeader;
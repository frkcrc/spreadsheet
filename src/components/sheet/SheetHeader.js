import ColHeadings from './headings/ColHeadings';
import styles from './SheetHeader.module.css';
import Spacer from './utils/Spacer';

const SheetHeader = () => {
  return (
    <div className={styles.sheetHeader}>
      <Spacer />
      <ColHeadings />
      <Spacer />
    </div>
  );
};

export default SheetHeader;
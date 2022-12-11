import HScrollbar from './scrollbars/HScrollbar';
import Spacer from './utils/Spacer';
import styles from './SheetFooter.module.css';

const SheetFooter = () => {
  return (
    <div className={styles.sheetFooter}>
      <Spacer />
      <HScrollbar />
      <Spacer />
    </div>
  );
};

export default SheetFooter;
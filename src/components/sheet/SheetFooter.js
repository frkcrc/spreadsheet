import HScrollbar from './scrollbars/HScrollbar';
import Spacer from './utils/Spacer';
import styles from './SheetFooter.module.css';

const SheetFooter = () => {
  return (
    <div className={styles.sheetFooter}>
      <Spacer width={50} />
      <HScrollbar />
      <Spacer width={30} />
    </div>
  );
};

export default SheetFooter;
import SheetPane from './SheetPane';
import RowHeadings from './headings/RowHeadings';
import styles from './SheetContainer.module.css';
import VScrollbar from './scrollbars/VScrollbar';

const SheetContainer = () => {
  return (
    <div className={styles.sheetContainer}>
      <RowHeadings />
      <SheetPane />
      <VScrollbar />
    </div>
  );
};

export default SheetContainer;
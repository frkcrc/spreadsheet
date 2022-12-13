import SheetPane from './pane/SheetPane';
import RowHeadings from './headings/RowHeadings';
import VScrollbar from './scrollbars/VScrollbar';
import styles from './SheetContent.module.css';

const SheetContent = () => {
  return (
    <div className={styles.sheetContent}>
      <RowHeadings />
      <SheetPane />
      <VScrollbar />
    </div>
  );
};

export default SheetContent;
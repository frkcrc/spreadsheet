import ColHeadings from './headings/ColHeadings';
import RowHeadings from './headings/RowHeadings';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';
import SheetPane from './sheet-view/SheetView';

import styles from './Spreadsheet.module.css';

const Spreadsheet = () => {
  return (
    <>

      <div className={styles.header}>
        <ColHeadings />
      </div>

      <div className={styles.content}>
        <RowHeadings />
        <SheetPane />
        <VScrollbar />
      </div>

      <div className={styles.footer}>
        <HScrollbar />
      </div>
    </>
  );
};

export default Spreadsheet;
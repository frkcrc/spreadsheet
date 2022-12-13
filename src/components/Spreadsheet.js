import ColHeadings from './headings/ColHeadings';
import RowHeadings from './headings/RowHeadings';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';
import SheetPane from './sheet-view/SheetView';
import Spacer from './Spacer';

import styles from './Spreadsheet.module.css';

const Spreadsheet = () => {
  return (
    <>

      <div className={styles.header}>
        <Spacer width={50} />
        <ColHeadings />
        <Spacer width={30} />
      </div>

      <div className={styles.content}>
        <RowHeadings />
        <SheetPane />
        <VScrollbar />
      </div>

      <div className={styles.footer}>
        <Spacer width={50} />
        <HScrollbar />
        <Spacer width={30} />
      </div>
    </>
  );
};

export default Spreadsheet;
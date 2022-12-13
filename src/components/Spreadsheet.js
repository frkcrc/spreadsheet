import SheetPane from './sheet-view/SheetView';
import HeadingCell from './sheet-view/HeadingCell';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';

import styles from './Spreadsheet.module.css';

const Spreadsheet = () => {
  return (
    <>

      <div className={styles.header}>
        {new Array(15).fill(<HeadingCell width={100} height={30} />)}
      </div>

      <div className={styles.content}>

        <div className={styles.rowHeadings}>
          {new Array(18).fill(<HeadingCell width={50} height={30}/>)}
        </div>

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
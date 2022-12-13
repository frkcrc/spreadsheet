import Cell from './cells/Cell';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';

import styles from './Spreadsheet.module.css';

const Spreadsheet = () => {
  return (
    <>
      <div className={styles.header}>
        {new Array(15).fill(<Cell head width={100} height={30} />)}
      </div>

      <div className={styles.content}>

        <div className={styles.rowHeadings}>
          {new Array(18).fill(<Cell head width={50} height={30}/>)}
        </div>

        <div className={styles.view}>
          {new Array(18).fill(
            <div className={styles.row}>
              {new Array(15).fill(<Cell width={100} height={30} />)}
            </div>
          )}
        </div>

        <VScrollbar />
      </div>

      <div className={styles.footer}>
        <HScrollbar />
      </div>
    </>
  );
};

export default Spreadsheet;
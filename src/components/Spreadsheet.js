import { useSelector } from 'react-redux';

import Cell from './cells/Cell';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';

import styles from './Spreadsheet.module.scss';
import Spacer from './utils/Spacer';
import { rowHeadWidth } from '../helpers/constants';

const Spreadsheet = () => {

  const spreadsheet = useSelector((state) => state.spreadsheet.current);
  const sheet = spreadsheet.sheets[0].cells;

  // TODO: Build actual cells for headings to pass to Cell.

  return (
    <>
      <div className={styles.hContainer}>
        <Spacer width={rowHeadWidth} height={30} />
        <div className={styles.header}>
          {sheet[0].map((c, i) => 
            <Cell 
              cell={ {...c, content: `C${i+1}` } }
              key={`C${i+1}`}
              head
            />
          )}
        </div>
        <Spacer width={30} height={30} />
      </div>
      

      <div className={styles.content}>

        <div className={styles.rowHeadings}>
          {sheet.map((r, i) => 
            <Cell 
              cell={ {...r[0], content: `R${i+1}`, width: rowHeadWidth } }
              key={`R${i+1}`}
              head
            />
          )}
        </div>

        <div className={styles.view}>
          {sheet.map((row, rIndex) => 
            <div className={styles.row} key={rIndex}>
              {row.map((cell, cIndex) => 
                <Cell key={`${rIndex}-${cIndex}`} cell={cell} />
              )}
            </div>
          )}
        </div>

        <VScrollbar />
      </div>

      <div className={styles.hContainer}>
        <Spacer width={rowHeadWidth} height={30} />
        <HScrollbar />
        <Spacer width={30} height={30} />
      </div>
    </>
  );
};

export default Spreadsheet;
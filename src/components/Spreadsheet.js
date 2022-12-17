import { useSelector } from 'react-redux';

import Cell from './cells/Cell';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';

import styles from './Spreadsheet.module.scss';
import Spacer from './utils/Spacer';

const defaultWidth = 100;
const defaultHeight = 30;
const rowHeadWidth = 50;

const Spreadsheet = () => {

  const spreadsheet = useSelector((state) => state.spreadsheet.current);
  const sheet = spreadsheet.sheets[0].cells;

  return (
    <>
      <div className={styles.hContainer}>
        <Spacer width={rowHeadWidth} height={30} />
        <div className={styles.header}>
          {sheet[0].map((c, i) => 
            <Cell 
              head
              width={defaultWidth}
              height={defaultHeight}
              content={'C' + i}
              key={'C' + i}
            />
          )}
        </div>
        <Spacer width={30} height={30} />
      </div>
      

      <div className={styles.content}>

        <div className={styles.rowHeadings}>
          {sheet.map((r, i) => 
            <Cell 
              head
              width={rowHeadWidth}
              height={defaultHeight}
              content={'R' + i}
              key={'R' + i}
            />
          )}
        </div>

        <div className={styles.view}>
          {sheet.map((row, rIndex) => 
            <div className={styles.row} key={rIndex}>
              {row.map((cell, cIndex) => 
                <Cell
                  width={defaultWidth}
                  height={defaultHeight}
                  content={cell?.content ?? ''}
                  key={cell?.id ?? `${rIndex}-${cIndex}`}
                />
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
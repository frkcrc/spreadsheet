import { useSelector } from 'react-redux';

import Cell from './cells/Cell';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';

import styles from './Spreadsheet.module.scss';
import Spacer from './utils/Spacer';
import { rowHeadWidth } from '../helpers/constants';
import { CellData } from '../helpers/sheet';

const Spreadsheet = () => {

  const spreadsheet = useSelector((state) => state.spreadsheet.current);
  const sheet = spreadsheet.sheets[0].cells;

  // TODO: Build actual cells for headings to pass to Cell.
  const colHeads = sheet[0].map((_, i) => new CellData(`C${i+1}`));
  const rowHeads = sheet.map((_, i) => 
    new CellData(`R${i+1}`, rowHeadWidth)
  );

  return (
    <>
      <div className={styles.hContainer}>
        <Spacer width={rowHeadWidth} height={30} />
        <div className={styles.header}>
          {colHeads.map(c => <Cell head cell={c} key={c.content} />)}
        </div>
        <Spacer width={30} height={30} />
      </div>
      

      <div className={styles.content}>

        <div className={styles.rowHeadings}>
          {rowHeads.map(r => <Cell head cell={r} key={r.content} />)}
        </div>

        <div className={styles.view}>
          {sheet.map((row, r) => 
            <div className={styles.row} key={r}>
              {row.map((cell, c) => 
                <Cell key={`${r+1}-${c+1}`} cell={cell} />
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
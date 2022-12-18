import { useSelector } from 'react-redux';

import Cell from './cells/Cell';
import Scrollbar from './view/Scrollbar';

import styles from './Spreadsheet.module.scss';
import Spacer from './utils/Spacer';
import { defaultHeight, rowHeadWidth, scrollbarThickness } from '../helpers/constants';
import { CellData, colToName, nameToCol } from '../helpers/sheet';

const Spreadsheet = () => {

  const spreadsheet = useSelector((state) => state.spreadsheet.current);
  const sheet = spreadsheet.sheets[0].cells;

  const colHeads = sheet[0].map((_, i) => 
    new CellData({content: colToName(i)})
  );
  const rowHeads = sheet.map((_, i) => 
    new CellData({content: `${i+1}`, width: rowHeadWidth})
  );

  return (
    <>
      <div className={styles.hContainer}>
        <Spacer width={rowHeadWidth} height={defaultHeight} />
        <div className={styles.header}>
          {colHeads.map((c, i) => <Cell head cell={c} key={i} />)}
        </div>
        <Spacer width={scrollbarThickness} height={defaultHeight} />
      </div>
      

      <div className={styles.content}>

        <div className={styles.rowHeadings}>
          {rowHeads.map((r, i) => <Cell head cell={r} key={i} />)}
        </div>

        <div className={styles.view}>
          {sheet.map((row, r) => 
            <div className={styles.row} key={r}>
              {row.map((cell, c) => 
                <Cell key={c} cell={cell} />
              )}
            </div>
          )}
        </div>

        <Scrollbar orientation="vertical" />
      </div>

      <div className={styles.hContainer}>
        <Spacer width={rowHeadWidth} height={scrollbarThickness} />
        <Scrollbar orientation="horizontal" />
        <Spacer width={scrollbarThickness} height={defaultHeight} />
      </div>
    </>
  );
};

export default Spreadsheet;
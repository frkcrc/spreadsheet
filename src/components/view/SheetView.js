import { useSelector } from 'react-redux';

import Cell from '../cells/Cell';
import Spacer from '../utils/Spacer';

import styles from './SheetView.module.scss';
import { defaultHeight, rowHeadWidth } from '../../helpers/constants';
import { CellData, colToName } from '../../helpers/sheet';

const SheetView = props => {

  const spreadsheet = useSelector((state) => state.spreadsheet);
  const selected = spreadsheet.selected;
  const sheet = spreadsheet.sheets[selected].cells;

  const colHeads = sheet[0].map((_, i) => 
    new CellData({content: colToName(i)})
  );
  const rowHeads = sheet.map((_, i) => 
    new CellData({content: `${i+1}`, width: rowHeadWidth})
  );

  return (
    <>
      <div className={styles.header}>
        <Spacer width={rowHeadWidth} height={defaultHeight} />
        <div className={styles.colHeaders}>
          {colHeads.map((c, i) => <Cell head cell={c} key={i} />)}
        </div>
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
      </div>
    </>
  );
};

export default SheetView;
import { useSelector } from 'react-redux';

import Cell from '../cells/Cell';
import Spacer from '../utils/Spacer';

import styles from './SheetView.module.scss';
import { defaultHeight, rowHeadWidth } from '../../helpers/constants';
import { CellData, colToName } from '../../helpers/sheet';

const SheetView = () => {

  // Extract the relevant state.
  const { cells, view } = useSelector((state) => {
    const id = state.spreadsheet.selected;
    const cells = state.spreadsheet.sheets[id].cells;
    const view = state.spreadsheet.sheets[id].view;
    return { cells, view };
  });

  // Build the view.
  const colHeads = cells[0].map((_, i) => 
    new CellData({content: colToName(i)})
  );
  const rowHeads = cells.map((_, i) => 
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
          {cells.map((row, r) => 
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
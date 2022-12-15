import Cell from './cells/Cell';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';

import styles from './Spreadsheet.module.scss';
import Spacer from './utils/Spacer';

// TODO: Cells should only be re-rendered as needed.
// TODO: Track row/col sizing for non-defaults.
// TODO: Is a full matrix the best data structure?

const defaultWidth = 100;
const defaultHeight = 30;
const rowHeadWidth = 50;

// Dummy sheet data.
const cols = 10;
const rows = 10;
const pFill = 0.2; // Around 20% of cells are filled.

// Build a dummy sheet with a few random cells.
const SHEET = new Array(rows).fill(undefined);
SHEET.forEach((_, i) => SHEET[i] = new Array(cols).fill(undefined));

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (Math.random() < pFill) {
      SHEET[row][col] = {
        row: row+1,
        col: col+1,
        id: `${row}-${col}`,
        content: Math.floor(Math.random() * 1000),
      };
    }
  }
}

const Spreadsheet = () => {

  const colHeaders = [];
  for (let i = 1; i <= cols; i++) {
    colHeaders.push(
      <Cell 
        head
        width={defaultWidth}
        height={defaultHeight}
        content={'C' + i}
        key={'C' + i}
      />
    );
  }
  const rowHeaders = [];
  for (let i = 1; i <= rows; i++) {
    rowHeaders.push(
      <Cell 
        head
        width={rowHeadWidth}
        height={defaultHeight}
        content={'R' + i}
        key={'R' + i}
      />
    );
  }

  return (
    <>
      <div className={styles.hContainer}>
        <Spacer width={rowHeadWidth} height={30} />
        <div className={styles.header}>
          {colHeaders}
        </div>
        <Spacer width={30} height={30} />
      </div>
      

      <div className={styles.content}>

        <div className={styles.rowHeadings}>
          {rowHeaders}
        </div>

        <div className={styles.view}>
          {SHEET.map((row, rIndex) => 
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
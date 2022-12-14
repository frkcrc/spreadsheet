import Cell from './cells/Cell';
import VScrollbar from './scrollbars/VScrollbar';
import HScrollbar from './scrollbars/HScrollbar';

import styles from './Spreadsheet.module.css';

// TODO: Lots of rerendering of cells going on.

const defaultWidth = 100;
const rowHeadWidth = 50;
const defaultHeight = 30;
const cols = 15;
const rows = 25;

// Build a dummy sheet.
const SHEET = [];
for (let row = 0; row < rows; row++) {
  const rowVector = [];
  for (let col = 0; col < cols; col++) {
    rowVector.push({
      row: row+1,
      col: col+1,
      id: `${row}-${col}`,
      content: Math.floor(Math.random() * 1000),
    });
  }
  SHEET.push(rowVector);
}

const Spreadsheet = () => {

  const colHeaders = SHEET[0].map(o => 
    <Cell 
      head
      width={defaultWidth}
      height={defaultHeight}
      content={'C' + o.col}
      key={'C' + o.col}
    />
  );
  const rowHeaders = SHEET.map((o, i) => 
    <Cell 
      head
      width={rowHeadWidth}
      height={defaultHeight}
      content={'R' + (i+1)}
      key={'R' + (i+1)}
    />
  );

  return (
    <>
      <div className={styles.header}>
        {colHeaders}
      </div>

      <div className={styles.content}>

        <div className={styles.rowHeadings}>
          {rowHeaders}
        </div>

        <div className={styles.view}>
          {SHEET.map((row, index) => 
            <div className={styles.row} key={index}>
              {row.map(cell => 
                <Cell
                  width={defaultWidth}
                  height={defaultHeight}
                  content={cell.content}
                  key={cell.id}
                />
              )}
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
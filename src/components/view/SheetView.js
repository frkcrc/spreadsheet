import { useDispatch, useSelector } from 'react-redux';

import Cell from '../cells/Cell';
import Spacer from '../utils/Spacer';
import styles from './SheetView.module.scss';

import { defaultHeight, rowHeadWidth } from '../../helpers/constants';
import { CellData } from '../../helpers/sheet';
import { colToName, visibleRange } from '../../helpers/view-utils';
import { useLayoutEffect, useRef } from 'react';
import { spreadsheetActions } from '../../store/spreadsheet';

const SheetView = () => {

  const viewRef = useRef();
  const dispatch = useDispatch();

  // Effect to set the size responsively.
  useLayoutEffect(() => {
    const calculateSize = () => {
      dispatch(spreadsheetActions.setViewport({
        width: viewRef.current.clientWidth,
        height: viewRef.current.clientHeight,
      }));
    };
    calculateSize();
    window.addEventListener('resize', calculateSize);
    return _ => window.removeEventListener('resize', calculateSize);
  }, [dispatch]);

  // Extract the relevant state.
  const id = useSelector(state => state.spreadsheet.selected);
  const cells = useSelector(state => state.spreadsheet.sheets[id].cells);
  const rows = useSelector(state => state.spreadsheet.sheets[id].view.rows);
  const cols = useSelector(state => state.spreadsheet.sheets[id].view.cols);
  const viewSize = useSelector(state => state.spreadsheet.viewport);

  // Define the visible range to display in the view.
  const range = {
    rows: {
      start: rows.start, 
      end: rows.sizes.length - 1,
    },
    cols: {
      start: cols.start, 
      end: cols.sizes.length - 1,
    },
  };

  // If the view size is defined, calculate visible range.
  if (viewSize) {
    range.cols.end = visibleRange(viewSize.width, cols);
    range.rows.end = visibleRange(viewSize.height, rows);
  }

  // Build the headings.

  // Build the view in the visible range.
  const colHeads = cells[0]
    .slice(range.cols.start, range.cols.end + 1)
    .map((_, i) => new CellData({
      content: colToName(range.cols.start + i)
    }));
  
  const rowHeads = cells
    .slice(range.rows.start, range.rows.end + 1)
    .map((_, i) => new CellData({
      content: `${range.rows.start+i+1}`,
      width: rowHeadWidth,
    }));

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

        <div className={styles.view} ref={viewRef}>
          {cells
            .slice(range.rows.start, range.rows.end + 1)
            .map((row, r) => 
              <div className={styles.row} key={r}>
                {row
                  .slice(range.cols.start, range.cols.end + 1)
                  .map((cell, c) => 
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
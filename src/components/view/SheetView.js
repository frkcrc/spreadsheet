import { useDispatch, useSelector } from 'react-redux';

import Cell from '../cells/Cell';
import Spacer from '../utils/Spacer';
import styles from './SheetView.module.scss';

import { defaultHeight, rowHeadWidth } from '../../helpers/constants';
import { CellData } from '../../helpers/sheet';
import { between, colToName, msBorders, msFix, same, visibleRange } from '../../helpers/view-utils';
import { useLayoutEffect, useRef, useState } from 'react';
import { spreadsheetActions } from '../../store/spreadsheet';

const SheetView = () => {

  const viewRef = useRef();
  const [isSelecting, setIsSelecting] = useState(false);
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

  // Handlers.
  
  const onPointerDownHandler = (e, cell) => {
    const target = { row: cell.row, col: cell.col }; 
    dispatch(spreadsheetActions.selectCell(target));
    dispatch(spreadsheetActions.selectMultiple(msFix(target, target)));
    if (e.button === 0) { // Only multiselect on left click.
      setIsSelecting(true);
    }
  };

  const onPointerEnterHandler = cell => {
    if (!isSelecting)
      return;
    const target = { row: cell.row, col: cell.col }
    dispatch(spreadsheetActions.selectMultiple(msFix(selectedCell, target)));
  };

  const onPointerUpHandler = cell => {
    if (!isSelecting)
      return;
    setIsSelecting(false);
    const target = { row: cell.row, col: cell.col }
    dispatch(spreadsheetActions.selectMultiple(msFix(selectedCell, target)));
  };

  // Extract the relevant state.
  const viewSize = useSelector(state => state.spreadsheet.viewport);
  const sheet = useSelector(state => 
    state.spreadsheet.sheets[state.spreadsheet.selected]);
  const {cells, view} = sheet;
  const {rows, cols, selectedCell, multiSelection} = view;

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
  
  const renderedSheet = cells
    .slice(range.rows.start, range.rows.end + 1)
    .map((row, r) => {
      // Prep the row's cells.
      const rowCells = row
        .slice(range.cols.start, range.cols.end + 1)
        .map((cell, c) => {
          const isMultiselected = between(cell, multiSelection);
          // Only show borders if not currently selecting.
          const borders = ( (isMultiselected && !isSelecting) ? 
            msBorders(cell, multiSelection) : {});
          return (
            <Cell
              key={c}
              cell={cell} 
              selected={same(cell, selectedCell)}
              multiselected={isMultiselected}
              borders={borders}
              pointerDown={onPointerDownHandler}
              pointerEnter={onPointerEnterHandler}
              pointerUp={onPointerUpHandler}
            />
          );
        });
      // Pack it in a row div.
      return (
        <div className={styles.row} key={r}>
          {rowCells}
        </div>
      );
    });

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
          {renderedSheet}
        </div>
      </div>
    </>
  );
};

export default SheetView;
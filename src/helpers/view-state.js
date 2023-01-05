// Functions that transform pieces of state related to the view.

import { visibleRange } from "./view-utils";

// Fixes the starting points based on the offset values.
export function fixStartingPoints(view) {
  for (let i = 0; i < view.rows.boundaries.length; i++) {
    if (view.rows.boundaries[i] > view.rows.offset)
      break;
    view.rows.start = i;
  }
  for (let i = 0; i < view.cols.boundaries.length; i++) {
    if (view.cols.boundaries[i] > view.cols.offset)
      break;
    view.cols.start = i;
  }
}

// Clamps the offsets to range of valid values.
export function clamp(state) {
  const view = state.sheets[state.selected].view;
  const rows = view.rows;
  const cols = view.cols;
  rows.offset = 
    Math.min(rows.total - state.viewport.height, Math.max(0, rows.offset));
  cols.offset = 
    Math.min(cols.total - state.viewport.width, Math.max(0, cols.offset));
}

// Adds the given offset, clamping to valid values.
export function changeOffset(state, axis, delta) {
  const view = state.sheets[state.selected].view[axis];
  view.offset += delta;
  clamp(state);
  fixStartingPoints(state.sheets[state.selected].view);
}

// Change the view position by the given amount of rows/cols.
export function changePosition(state, axis, delta) {
  const view = state.sheets[state.selected].view[axis];
  const start = 
    Math.min(view.sizes.length - 1, Math.max(0, view.start + delta));
  view.offset = view.boundaries[start];
  clamp(state);
  fixStartingPoints(state.sheets[state.selected].view);
}

// Clamp the row/col coordinates to valid coordinates in the sheet.
export function clampCellCoord(state, {row, col}) {
  const view = state.sheets[state.selected].view;
  const rows = view.rows.sizes.length - 1;
  const cols = view.cols.sizes.length - 1;
  const clamped =  {
    row: Math.max(0, Math.min(row, rows)),
    col: Math.max(0, Math.min(col, cols)),
  };
  return clamped;
}

// Adjusts the start point to make sure the selected cell stays visible.
export function makeSelectionVisible(state) {
  const view = state.sheets[state.selected].view;
  // Extract info about the view and the viewport.
  const {rows, cols, selectedCell} = view;
  const { width, height } = state.viewport;
  // Calculate start and end row/col.
  const endRow = visibleRange(height, rows);
  const endCol = visibleRange(width, cols);
  // Calculate the delta on rows and columns.
  let deltaRow = 0, deltaCol = 0;
  if (selectedCell.row < rows.start) {
    deltaRow = -(rows.start - selectedCell.row);
  } else if (selectedCell.row > endRow) {
    deltaRow = selectedCell.row - endRow;
  }
  if (selectedCell.col < cols.start) {
    deltaCol = -(cols.start - selectedCell.col);
  } else if (selectedCell.col > endCol) {
    deltaCol = selectedCell.col - endCol;
  }
  // Apply the deltas.
  if (deltaRow !== 0) {
    changePosition(state, 'rows', deltaRow);
  }
  if (deltaCol !== 0) {
    changePosition(state, 'cols', deltaCol);
  }
  
}
// Functions that transform pieces of state related to the view.

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
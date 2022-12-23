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

// Adds the given offset, clamping to valid values.
export function changeOffset(state, axis, delta) {
  const view = state.sheets[state.selected].view[axis];
  const length = state.viewport[(axis === 'rows' ? 'height' : 'width')];
  const maxOffset = view.total - length;
  view.offset = 
    Math.min(maxOffset, Math.max(0, view.offset + delta));
  fixStartingPoints(state.sheets[state.selected].view);
}
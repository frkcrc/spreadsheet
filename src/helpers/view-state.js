// Functions that transform pieces of state related to the view.

// Changes a sheet view object, fixing the starting points based on the
// offset values.
export function offsetsToStarts(view) {
  for (let i = 0; i < view.rows.boundaries.length; i++) {
    if (view.rows.boundaries[i] * view.rows.total > view.rows.offset)
      break;
    view.rows.start = i;
  }
  for (let i = 0; i < view.cols.boundaries.length; i++) {
    if (view.cols.boundaries[i] * view.cols.total > view.cols.offset)
      break;
    view.cols.start = i;
  }
}
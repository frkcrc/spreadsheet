// Utility methods used by the view.

// Converts a 0-based column number to a letter-based ID.
export function colToName(num) {
  let n = num + 1;
  let name = '';
  while (n > 0) {
    const remainder = (n % 26 || 26); // 0 gets rolled to 26.
    n = Math.floor((n-1) / 26);
    name = String.fromCharCode(65 + remainder - 1) + name;
  }
  return name;
}

// Converts a letter-based column ID to a 0-based number.
export function nameToCol(name) {
  const letters = name.split('').reverse();
  let col = -1; // Start from -1 to go 0-based.
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const ordinal = letter.charCodeAt(0) - 65 + 1;
    col += ordinal * (26 ** i);
  }
  return col;
}

// Returns the end of the visible range of row/cols, starting from start,
// according to the available space and row/col sizes.
export function visibleRange(space, {start, sizes}) {
  let lastBlock = start;
  let totalSpace = sizes[start];
  while (totalSpace <= space && lastBlock < sizes.length - 1) {
    totalSpace += sizes[++lastBlock];
  }
  return lastBlock;
}

// Checks if the two objects have the same row/col properties.
export function same(x, y) {
  return (x && y && x.row === y.row && x.col === y.col);
}

// Returns the correct pair of objects for the top-left and bottom-right
// corner of a multiselection box between the two given cells.
export function msFix(x, y) {
  return {
    start: {
      row: Math.min(x.row, y.row),
      col: Math.min(x.col, y.col),
    },
    end: {
      row: Math.max(x.row, y.row),
      col: Math.max(x.col, y.col),
    }
  };
}

// Checks if a cell is inside the box delimited by the given start/end.
export function between(x, {start, end}) {
  if (!x || !start || !end)
    return false;
  return (x.row >= start.row && x.row <= end.row &&
          x.col >= start.col && x.col <= end.col);
} 
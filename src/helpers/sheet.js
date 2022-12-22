import { 
  defaultHeight, 
  defaultSheetName, 
  defaultWidth, 
  startingCols, 
  startingRows 
} from "./constants";

// Helper functions to manipulate sheets and cells.

// Cell object constructor.
export function CellData(params = {}) {
  return {
    content: '',
    width: defaultWidth,
    height: defaultHeight,
    ...params
  };
}

// Sheet constructor.
export function Sheet(name, sheetRows, sheetCols) {
  const rows = sheetRows ?? startingRows;
  const cols = sheetCols ?? startingCols;

  const sheet = {};
  sheet.name = name ?? defaultSheetName;

  sheet.cells = [];
  for (let i = 0; i < rows; i++) {
    sheet.cells[i] = [];
    for (let j = 0; j < cols; j++) {
      sheet.cells[i][j] = new CellData();
    }
  }

  sheet.view = calculateView(sheet.cells);

  return sheet;
}

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

// Calculates data to determine the sheet's view.
// Boundaries are the fractions of the total width/height where the row or
// column starts (eg: 0.5 = col starts at the middle of the total w).
// Height and width are the total in pixel.
// Offset is the offset from the start of the current view, in pixels.
export function calculateView(cells) {
  // Extract all widths/heights.
  const colWidths = cells[0].map(c => c.width);
  const rowHeights = cells.map(r => r[0].height);
  // Sum of all widths/heights.
  const width = colWidths.reduce((x, y) => x+y, 0);
  const height = rowHeights.reduce((x, y) => x+y, 0);
  // Partial sums as a fraction of the total.
  const boundariesCols = [], boundariesRows = [];
  colWidths.reduce((acc, c) => {
    boundariesCols.push(acc/width);
    return acc+c;
  }, 0);
  rowHeights.reduce((acc, r) => {
    boundariesRows.push(acc/height);
    return acc+r;
  }, 0);

  return {
    hash: '' + Math.random(),
    rows: {
      sizes: rowHeights,
      total: height,
      boundaries: boundariesRows,
      start: 0,
      offset: 0
    },
    cols: {
      sizes: colWidths,
      total: width,
      boundaries: boundariesCols,
      start: 0,
      offset: 0
    },
  };
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
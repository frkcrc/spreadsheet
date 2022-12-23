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
    rows: {
      sizes: rowHeights,
      total: height,
      boundaries: boundariesRows,
      start: 0,
    },
    cols: {
      sizes: colWidths,
      total: width,
      boundaries: boundariesCols,
      start: 0,
    },
    offsets: {
      x: 0,
      y: 0
    }
  };
}
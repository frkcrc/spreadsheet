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
    row: 0,
    col: 0,
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
      sheet.cells[i][j] = new CellData({row: i, col: j});
    }
  }

  sheet.view = calculateView(sheet.cells);

  return sheet;
}

// Calculates data to determine the sheet's view.
// Boundaries are the partial sums of width/height.
// Height and width are the total in pixel.
// Offset is the offset from the start of the current view, in pixels.
export function calculateView(cells) {
  // Extract all widths/heights.
  const colWidths = cells[0].map(c => c.width);
  const rowHeights = cells.map(r => r[0].height);
  // Sum of all widths/heights, and partial sums.
  const boundariesCols = [], boundariesRows = [];
  const width = colWidths.reduce((acc, c) => {
    boundariesCols.push(acc)
    return acc+c;
  }, 0);
  const height = rowHeights.reduce((acc, r) => {
    boundariesRows.push(acc);
    return acc+r;
  }, 0);

  return {
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
    }
  };
}
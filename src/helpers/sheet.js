import { 
  defaultHeight, 
  defaultSheetName, 
  defaultWidth, 
  minColWidth, 
  minRowHeight, 
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

  sheet.view = {
    selectedCell: null,
    multiSelection: null,
    ...calculateView(sheet.cells),
  };

  return sheet;
}

// Calculates data to determine the sheet's view.
// Boundaries are the partial sums of width/height.
// Height and width are the total in pixel.
// Offset is the offset from the start of the current view, in pixels.
export function calculateView(cells, oldView) {
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
      total: height + minRowHeight, // Some padding below.
      boundaries: boundariesRows,
      start: (oldView?.rows.start ?? 0),
      offset: (oldView?.rows.offset ?? 0)
    },
    cols: {
      sizes: colWidths,
      total: width + minColWidth,
      boundaries: boundariesCols,
      start: (oldView?.cols.start ?? 0),
      offset: (oldView?.cols.offset ?? 0)
    }
  };
}

// Adds a column to the sheet at the given position.
export function addColumn(sheet, index) {
  const cells = sheet.cells;
  // Add the new column's cell to each row.
  for (let i = 0; i < cells.length; i++) {
    const row = cells[i];
    row.splice(index, 0, CellData({row: i, col: index}));
    for (let j = index + 1; j < row.length; j++) {
      row[j].col++;
    }
  }
  // Rebuild view data.
  sheet.view = calculateView(cells, sheet.view);
}

// Removes a column from the sheet.
export function removeColumn(sheet, index) {
  const cells = sheet.cells;
  // Remove the column cell from each row.
  for (let i = 0; i < cells.length; i++) {
    const row = cells[i];
    row.splice(index, 1);
    for (let j = index; j < row.length; j++) {
      row[j].col--;
    }
  }
  // Rebuild view data.
  sheet.view = calculateView(cells, sheet.view);
}

// Adds a row to the sheet at the given position.
export function addRow(sheet, index) {
  const cells = sheet.cells;
  // Add the new row of cells and fix indexes.
  cells.splice(index, 0, new Array(cells[0].length));
  for (let j = 0; j < cells[index].length; j++) {
    cells[index][j] = CellData({row: index, col: j});
  }
  for (let i = index; i < cells.length; i++) {
    for (let j = 0; j < cells[index].length; j++) {
      cells[i][j].row++;
    }
  }
  // Rebuild view data.
  sheet.view = calculateView(cells, sheet.view);
}

// Removes a column from the sheet.
export function removeRow(sheet, index) {
  const cells = sheet.cells;
  // Remove the row and fix indices.
  cells.splice(index, 1);
  for (let i = index; i < cells.length; i++) {
    const row = cells[i];
    for (let j = 0; j < row.length; j++) {
      row[j].row--;
    }
  }
  // Rebuild view data.
  sheet.view = calculateView(cells, sheet.view);
}

// Resizes a column in the sheet.
export function resizeCol(sheet, index, width) {
  const cells = sheet.cells;
  // Change the width of the column in each cell.
  for (let i = 0; i < cells.length; i++) {
    cells[i][index].width = width;
  }
  // Rebuild view data (saving selection).
  const selectedCell = sheet.view.selectedCell;
  const multiSelection = sheet.view.multiSelection;
  sheet.view = calculateView(cells, sheet.view);
  sheet.view.selectedCell = selectedCell;
  sheet.view.multiSelection = multiSelection;
}

// Resizes a row in the sheet.
export function resizeRow(sheet, index, height) {
  const cells = sheet.cells;
  // Change the width of every cell in the row.
  cells[index].forEach(c => { c.height = height; });
  // Rebuild view data (saving selection).
  const selectedCell = sheet.view.selectedCell;
  const multiSelection = sheet.view.multiSelection;
  sheet.view = calculateView(cells, sheet.view);
  sheet.view.selectedCell = selectedCell;
  sheet.view.multiSelection = multiSelection;
}
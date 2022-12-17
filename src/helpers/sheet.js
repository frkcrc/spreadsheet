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
export function Sheet(
  name = defaultSheetName, 
  rows = startingRows,
  cols = startingCols
) {
  this.name = name;
  this.cells = [];
  for (let i = 0; i < rows; i++) {
    this.cells[i] = [];
    for (let j = 0; j < cols; j++) {
      this.cells[i][j] = new CellData();
    }
  }
}
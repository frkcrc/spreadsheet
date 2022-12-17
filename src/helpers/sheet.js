import { defaultHeight, defaultWidth, startingCols, startingRows } from "./constants";

// Helper functions to manipulate sheets and cells.

// Cell object constructor.
export function CellData(
  content = '', 
  width = defaultWidth, 
  height = defaultHeight
) {
  this.content = content;
  this.width = width;
  this.height = height;
}

// Sheet constructor.
export function Sheet(
  name = 'My Sheet', 
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
import { createSlice } from "@reduxjs/toolkit";
import { incrementalSheetName } from "../helpers/constants";
import { Sheet, addColumn, removeColumn, addRow, removeRow, resizeCol, resizeRow, clearColumn, clearRow, clearSelection } from "../helpers/sheet";
import { changeOffset, changePosition, clampCellCoord, makeSelectionVisible } from "../helpers/view-state";

const spreadsheetSlice = createSlice({

  name: 'spreadsheet',

  initialState: {
    // Sheets data
    nextId: 4,
    selected: 0,
    sheets: [
      new Sheet('Sheet 1'),
      new Sheet('Sheet 2'),
      new Sheet('Sheet 3')
    ],
    // Editing data
    editing: {
      editing: false,
      content: '',
      cell: null,
    },
    // View data
    viewport: { width: 0, height: 0 },
    popup: { show: false, data: null }
  },

  reducers: {

    setViewport: (state, action) => {
      state.viewport = action.payload;
    },

    selectSheet: (state, action) => {
      state.selected = action.payload;
    },

    selectCell: (state, action) => {
      state.sheets[state.selected].view.selectedCell = action.payload;
    },

    selectMultiple: (state, action) => {
      state.sheets[state.selected].view.multiSelection = action.payload;
    },

    selectMove: (state, action) => {
      const { rowDelta, colDelta } = action.payload;
      const view = state.sheets[state.selected].view;
      const selected = view.selectedCell;
      if (selected) {
        view.selectedCell = clampCellCoord(state, {
          row: selected.row + rowDelta,
          col: selected.col + colDelta,
        });
      } else { // If none is selected, select (0,0).
        view.selectedCell = { row: 0, col: 0 };
      }
      view.multiSelection = null;
      makeSelectionVisible(state);
    },

    newSheet: (state) => {
      const id = state.nextId++;
      state.sheets.push(
        new Sheet(incrementalSheetName.replace('#', id))
      );
      state.selected = state.sheets.length - 1;
    },

    removeSheet: (state, action) => {
      const id = action.payload;
      if (state.sheets.length > 1) { // Don't delete last sheet.
        state.sheets.splice(id, 1);
        state.selected = 0;
      }
    },

    addOffset: (state, action) => {
      const { axis, delta } = action.payload;
      changeOffset(state, axis, delta);
    },

    scroll: (state, action) => {
      if (!state.editing.editing) {
        const { axis, delta } = action.payload;
        changePosition(state, axis, delta);
      }
    },

    setPopup: (state, action) => {
      state.popup = action.payload;
    },

    addColumn: (state, action) => {
      addColumn(state.sheets[state.selected], action.payload);
      changeOffset(state, 'cols', 0); // Fix offsets.
    },

    removeColumn: (state, action) => {
      removeColumn(state.sheets[state.selected], action.payload);
      changeOffset(state, 'cols', 0); // Fix offsets.
    },

    addRow: (state, action) => {
      addRow(state.sheets[state.selected], action.payload);
      changeOffset(state, 'rows', 0); // Fix offsets.
    },

    removeRow: (state, action) => {
      removeRow(state.sheets[state.selected], action.payload);
      changeOffset(state, 'rows', 0); // Fix offsets.
    },

    resizeColumn: (state, action) => {
      // Change the column width.
      const {index, width} = action.payload;
      resizeCol(state.sheets[state.selected], index, width);
      changeOffset(state, 'cols', 0); // Fix offsets.
    },

    resizeRow: (state, action) => {
      // Change the column width.
      const {index, height} = action.payload;
      resizeRow(state.sheets[state.selected], index, height);
      changeOffset(state, 'rows', 0); // Fix offsets.
    },

    clearColumn: (state, action) => {
      clearColumn(state.sheets[state.selected], action.payload);
    },

    clearRow: (state, action) => {
      clearRow(state.sheets[state.selected], action.payload);
    },

    clearCell: (state, action) => {
      const {row, col} = action.payload;
      state.sheets[state.selected].cells[row][col].content = '';
    },
    
    clearSelection: (state) => {
      const view = state.sheets[state.selected].view;
      if (view.selectedCell) {
        const {row, col} = view.selectedCell;
        state.sheets[state.selected].cells[row][col].content = '';
      }
      if (view.multiSelection) {
        clearSelection(state.sheets[state.selected]);
      }
    },

    setEditing: (state, action) => {
      const toEmpty = !!action.payload;
      state.editing.editing = true;
      const {row, col} = state.sheets[state.selected].view.selectedCell;
      const cell = state.sheets[state.selected].cells[row][col];
      state.editing.cell = cell;
      state.editing.content = toEmpty ? '' : cell.content;
    },

    setEditingContent: (state, action) => {
      state.editing.content = action.payload;
    },

    quitEditing: (state, action) => {
      const save = action.payload;
      if (save) {
        const {row, col} = state.editing.cell;
        state.sheets[state.selected].cells[row][col].content
          = state.editing.content;
      }
      state.editing.editing = false;
      state.editing.content = '';
      state.editing.cell = null;
    },
    
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
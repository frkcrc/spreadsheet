import { createSlice } from "@reduxjs/toolkit";
import { incrementalSheetName } from "../helpers/constants";
import { Sheet, addColumn, removeColumn, addRow, removeRow } from "../helpers/sheet";
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
      view.selectedCell = clampCellCoord(state, {
        row: selected.row + rowDelta,
        col: selected.col + colDelta,
      });
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

    addOffset: (state, action) => {
      const { axis, delta } = action.payload;
      changeOffset(state, axis, delta);
    },

    scroll: (state, action) => {
      const { axis, delta } = action.payload;
      changePosition(state, axis, delta);
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
    
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
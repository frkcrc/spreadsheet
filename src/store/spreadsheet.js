import { createSlice } from "@reduxjs/toolkit";
import { incrementalSheetName } from "../helpers/constants";
import { Sheet } from "../helpers/sheet";
import { changeOffset, changePosition } from "../helpers/view-state";

const spreadsheetSlice = createSlice({

  name: 'spreadsheet',

  initialState: {
    selected: 0,
    sheets: [
      new Sheet('Sheet 1'),
      new Sheet('Sheet 2'),
      new Sheet('Sheet 3')
    ],
    viewport: { width: 0, height: 0 },
    nextId: 4,
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
    
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
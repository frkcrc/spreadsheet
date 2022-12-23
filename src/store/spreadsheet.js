import { createSlice } from "@reduxjs/toolkit";
import { Sheet } from "../helpers/sheet";
import { offsetsToStarts } from "../helpers/view-state";

const spreadsheetSlice = createSlice({

  name: 'spreadsheet',

  initialState: {
    selected: 0,
    sheets: [
      new Sheet('Sheet 1'),
      new Sheet('Sheet 2', 10, 5),
      new Sheet('Sheet 3')
    ],
    viewport: { width: 0, height: 0 },
  },

  reducers: {

    setViewport: (state, action) => {
      state.viewport = action.payload;
    },

    selectSheet: (state, action) => {
      state.selected = action.payload;
    },

    addOffset: (state, action) => {
      const id = state.selected;
      const axis = state.sheets[id].view[action.payload.axis];
      const delta = action.payload.delta;
      axis.offset += delta; // BROKEN! Clamp to [0,max] range.
      offsetsToStarts(state.sheets[id].view);
    },

    setOffset: (state, action) => {
      const id = state.selected;
      if ('cols' in action.payload) {
        state.sheets[id].view.cols.offset = action.payload.cols;
      } else {
        state.sheets[id].view.rows.offset = action.payload.rows;
      }
      offsetsToStarts(state.sheets[id].view);
    },
    
    setViewStart: (state, action) => {
      const id = state.selected;
      if ('row' in action.payload) {
        state.sheets[id].view.rows.start = action.payload.row;
      }
      if ('col' in action.payload) {
        state.sheets[id].view.cols.start = action.payload.col;
      }
    }
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
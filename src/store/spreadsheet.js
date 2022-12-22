import { createSlice } from "@reduxjs/toolkit";
import { offsetsToStarts, Sheet } from "../helpers/sheet";

const spreadsheetSlice = createSlice({

  name: 'spreadsheet',

  initialState: {
    selected: 0,
    sheets: [
      new Sheet('Sheet 1'),
      new Sheet('Sheet 2', 10, 5),
      new Sheet('Sheet 3')
    ],
  },

  reducers: {

    selectSheet: (state, action) => {
      state.selected = action.payload;
    },

    setOffset: (state, action) => {
      const id = state.selected;
      if ('x' in action.payload) {
        state.sheets[id].view.offsets.x = action.payload.x;
      } else {
        state.sheets[id].view.offsets.y = action.payload.y;
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
import { createSlice } from "@reduxjs/toolkit";
import { Sheet } from "../helpers/sheet";

const spreadsheetSlice = createSlice({

  name: 'spreadsheet',

  initialState: {
    current: {
      // file info...
      sheets: [
        new Sheet('Sheet 1'),
        new Sheet('Sheet 2'),
        new Sheet('Sheet 3')
      ],
      selected: 0,
    },
    // history...
  },

  reducers: {
    selectSheet: (state, action) => {
      state.current.selected = action.payload;
    }
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
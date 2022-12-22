import { createSlice } from "@reduxjs/toolkit";
import { Sheet } from "../helpers/sheet";

const spreadsheetSlice = createSlice({

  name: 'spreadsheet',

  initialState: {
    selected: 0,
    sheets: [
      new Sheet('Sheet 1')
    ],
  },

  reducers: {
    selectSheet: (state, action) => {
      state.selected = action.payload;
    }
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
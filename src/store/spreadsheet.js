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
    },
    // history...
  },

  reducers: {
    
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
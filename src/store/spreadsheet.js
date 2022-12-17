import { createSlice } from "@reduxjs/toolkit";

const spreadsheetSlice = createSlice({

  name: 'spreadsheet',

  initialState: {
    current: {
      // file info...
      sheets: [
        {
          name: 'Sheet 1',
          cells: [
            [ { content: '', width: 100, height: 30 } ]
          ],
        },
      ],
    },
    // history...
  },

  reducers: {
    
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
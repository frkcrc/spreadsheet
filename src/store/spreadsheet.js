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
      const dir =(action.payload.axis === 'rows' ? 'height' : 'width');
      const maxOffset = axis.total - state.viewport[dir];
      axis.offset += action.payload.delta;
      axis.offset = Math.min(maxOffset, Math.max(0, axis.offset));
      offsetsToStarts(state.sheets[id].view);
    },
    
  }
});

export const spreadsheetActions = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;
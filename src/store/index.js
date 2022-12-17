import { configureStore } from "@reduxjs/toolkit";
import spreadsheetReducer from './spreadsheet';

const store = configureStore({
  reducer: {
    spreadsheet: spreadsheetReducer,
  }
});

export default store;
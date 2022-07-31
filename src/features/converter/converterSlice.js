import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fromCurrency: "NGN",
  toCurrency: "USD",
};

export const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setFromCurrrency: (state, action) => {
      state.fromCurrency = action.payload;
    },
    setToCurrrency: (state, action) => {
      state.toCurrency = action.payload;
    },
  },
});

export const { setFromCurrrency, setToCurrrency } = converterSlice.actions;

export default converterSlice.reducer;

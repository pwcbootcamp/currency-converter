import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
  currencyRates: {},
  from: "USD",
  to: "NGN",
  result: 0,
  error: "",
};

export const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFromValue: (state, action) => {
      state.from = action.payload;
    },
    setToValue: (state, action) => {
      state.to = action.payload;
    },
    setCurrencyRates: (state, action) => {
      state.currencyRates = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

// export actions
export const {
  setInput,
  setError,
  setFromValue,
  setToValue,
  setCurrencyRates,
  setResult,
} = converterSlice.actions;

export default converterSlice.reducer; // export the converter reducer

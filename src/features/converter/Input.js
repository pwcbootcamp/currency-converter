import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setError, setInput } from "./converterSlice";

const Input = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.converter.error);
  const input = useSelector((state) => state.converter.input);

  const setInputValue = (value) => {
    if (/\D/.test(value)) {
      dispatch(setError("Not a valid input"));
    } else {
      dispatch(setInput(value));
      if (error) dispatch(setError(""));
    }
  };

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );
};

export default Input;

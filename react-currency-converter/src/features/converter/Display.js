import React from "react";
import { useSelector } from "react-redux";

const Display = () => {
  const inputValue = useSelector((state) => state.converter.input);
  const result = useSelector((state) => state.converter.result);
  const from = useSelector((state) => state.converter.from);
  const to = useSelector((state) => state.converter.to);

  return (
    <>
      {inputValue.length > 0 && (
        <h4>{`${inputValue} ${from} = ${result.toFixed(2)} ${to}`}</h4>
      )}
    </>
  );
};

export default Display;

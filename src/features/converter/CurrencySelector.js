import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFromValue, setToValue } from "./converterSlice";

const CurrencySelector = ({ type }) => {
  const dispatch = useDispatch();
  const currencyRates = useSelector((state) => state.converter.currencyRates);
  const from = useSelector((state) => state.converter.from);
  const to = useSelector((state) => state.converter.to);

  const currencyAliases = Object.keys(currencyRates);

  const setCurrencyPosition = (value) => {
    if (type === "from") {
      dispatch(setFromValue(value));
    }
    if (type === "to") {
      dispatch(setToValue(value));
    }
  };

  return (
    <>
      {type === "to" ? (
        <select
          name={type}
          id={type}
          defaultValue={to}
          onChange={(e) => setCurrencyPosition(e.target.value)}
        >
          <option value={to}>{to}</option>
        </select>
      ) : (
        <select
          name={type}
          id={type}
          onChange={(e) => setCurrencyPosition(e.target.value)}
          defaultValue={from}
        >
          <option value={from}>{from}</option>
          {currencyAliases
            .filter((alias) => {
              return alias !== from;
            })
            .map((alias) => {
              return (
                <option key={alias} value={alias}>
                  {alias}
                </option>
              );
            })}
        </select>
      )}
    </>
  );
};

export default CurrencySelector;

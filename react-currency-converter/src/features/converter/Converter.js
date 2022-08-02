import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import CurrencySelector from "./CurrencySelector";
import Input from "./Input";
import Display from "./Display";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrencyRates,
  setFromValue,
  setInput,
  setResult,
  setToValue,
} from "./converterSlice";

const Converter = () => {
  const currencyRates = useSelector((state) => state.converter.currencyRates);
  const from = useSelector((state) => state.converter.from);
  const to = useSelector((state) => state.converter.to);
  const input = useSelector((state) => state.converter.input);
  const error = useSelector((state) => state.converter.error);
  const result = useSelector((state) => state.converter.result);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");

  // fetch the currency conversion rates
  // THe function can fethch either recent currency conversion data
  // or historic/past data if a date is specified to use when querying the api
  const fetchCurrencyRates = async () => {
    // let res = { data: { rates: {} } };
    let res;
    try {
      if (date.length > 0) {
        res = await axios.get(
          `https://api.apilayer.com/fixer/${date}?base=${from}`,
          {
            headers: {
              apikey: "NYtOTeyyQnOHNNKOF6GxStMudUBwRuiX",
            },
          }
        );
      } else {
        res = await axios.get(
          `https://api.apilayer.com/fixer/latest?base=${from}`,
          {
            headers: {
              apikey: "NYtOTeyyQnOHNNKOF6GxStMudUBwRuiX",
            },
          }
        );
      }

      // if the response is not empty set the state 'currencyRates' to the response object
      if (res.data.rates) {
        dispatch(setCurrencyRates(res.data.rates));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function to convert the curreency
  const convertCurrency = () => {
    if (currencyRates !== {}) {
      let result = Number(input) * currencyRates[to];
      return result;
    }
  };

  // function to switch between the from currency and to currency
  const flip = () => {
    const temp = from;
    dispatch(setFromValue(to));
    dispatch(setToValue(temp));
  };

  useEffect(() => {
    fetchCurrencyRates();
    if (input.length > 0) dispatch(setInput(""));
  }, [from, date]);

  useEffect(() => {
    if (!error && input.length > 0) {
      dispatch(setResult(convertCurrency()));
    } else {
      if (result) dispatch(setResult(0));
    }
  }, [input]);

  return (
    <>
      <div className="converterForm">
        <div className="row1">
          <div>
            <Input />
            <br />
            {error && <div className="error">{error}</div>}
          </div>
          <div className="controls">
            <CurrencySelector type="from" />
            <FaExchangeAlt className="alt-icon" onClick={flip} />
            <CurrencySelector type="to" />
          </div>
        </div>

        <div className="dateField">
          <label htmlFor="date"></label>Date:{" "}
          <input
            name="date"
            type="date"
            value={date}
            placeholder="YYYY-MM-DD"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <Display />
      </div>
    </>
  );
};

export default Converter;

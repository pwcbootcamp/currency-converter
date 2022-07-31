import React, { useState, useEffect } from "react";
import { FaToggleOn } from "react-icons/fa";
//import { FaToggleOff } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setFromCurrrency, setToCurrrency } from "./converterSlice";

const Converter = () => {
  const fromCurrency = useSelector((state) => state.converter.fromCurrency);
  const toCurrency = useSelector((state) => state.converter.toCurrency);

  const dispatch = useDispatch();

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const [rate, setRate] = useState(0);

  async function fetchRate() {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/6a79c46b101e1629c0661503/pair/${fromCurrency}/${toCurrency}`
      );

      const data = await res.json();
      const rateData = await data.conversion_rate;
      console.log(await rateData, await data);
      setRate(await rateData);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchRate();
  }, [fromCurrency, toCurrency]);

  return (
    <div>
      <section className="converter-container">
        <div className="converter-wrapper">
          <div className="header-container">
            <h2>CURRENCY CONVERTER</h2>
            <FaToggleOn size={35} />
            {/* <FaToggleOff size={35} /> */}
          </div>
          <div className="divider">
            <hr />
          </div>

          <div className="from-amount-container">
            <input
              className="from-amount"
              type="number"
              placeholder="Enter an amount"
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(e.target.value);
                setToAmount(Number(e.target.value) * rate);
              }}
            />
            <select
              className="from-amount-select"
              id="currency"
              name="currency"
              onChange={(e) => dispatch(setFromCurrrency(e.target.value))}
            >
              <option>-- USD --</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="to-amount-container">
            <input
              className="to-amount"
              type="number"
              placeholder="Enter an amount"
              value={toAmount}
              onChange={(e) => {
                setToAmount(e.target.value);
                setFromAmount(Number(e.target.value) / rate);
              }}
            />
            <select
              className="to-amount-select"
              id="currency"
              name="currency"
              onChange={(e) => dispatch(setToCurrrency(e.target.value))}
            >
              <option>-- EUR --</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="rate">
            <h4>Exchange Rate = {rate}</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Converter;

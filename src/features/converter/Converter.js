import React, { useState } from "react";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";

const Converter = () => {
  const [input, setInput] = useState(0);
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <select
              className="from-amount-select"
              id="currency"
              name="currency"
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <select className="to-amount-select" id="currency" name="currency">
              <option>-- EUR --</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="rate">
            <h4>Exchange Rate = 2500</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Converter;

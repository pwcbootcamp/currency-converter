import NumberBeautify from "js-number-beautifier";
import { useEffect, useState } from "react";
import SelectCurrency from "./SelectCurrency";
import logo from "../logo1.png";

function ExchangeTab() {
  const [baseCurrency, setBaseCurrency] = useState("NGN");
  const [currency, setCurrency] = useState("USD");
  const [source, setSource] = useState("10");
  const [rates, setRates] = useState("");
  const [xrates, setXrates] = useState(1000.0);
  const [timeline, setTimeline] = useState("");

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "QrOJjQFHSBNl7sdcfYTv6c5VvixpCxff");
    let requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    fetch(
      `https://api.apilayer.com/exchangerates_data/latest?base=${currency}&symbols=${baseCurrency}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRates(result.rates[`${baseCurrency}`]);
        setXrates(Number(rates) * parseInt(source.replace(/,/g, "")));
        setTimeline(result.timestamp);
        console.log(source);
        console.log(rates);
      })
      .catch((error) => console.log("error", error));
  }, [baseCurrency, currency, rates, source]);

  return (
    <div className="ExchangeTab">
      <h3>
        Currency Converter <img className="App-logo" src={logo} alt="logo" />
      </h3>
      <p className="timeline">
        {`//Timestamp`}:Time-
        {new Date(timeline * 1000).getHours().toString().padStart(2, "0")}:
        {new Date(timeline * 1000).getMinutes().toString().padStart(2, "0")}:
        {new Date(timeline * 1000).getSeconds().toString().padStart(2, "0")}
      </p>
      <div className="card">
        <div className="card-item">
          <p>Amount:</p>
          <input
            className="amount"
            type="text"
            placeholder="amount"
            // value={source}
            value={NumberBeautify(source)}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <SelectCurrency
          format={"From"}
          setCurrency={setCurrency}
          currency={currency}
        />
        <p>
          {"\u003E"}
          {"\u003E"}
          {"\u003E"}
        </p>
        <SelectCurrency
          format={"To"}
          setCurrency={setBaseCurrency}
          currency={baseCurrency}
        />

        <p className="result">
          {NumberBeautify(`${xrates.toFixed(2)}`, baseCurrency)}
        </p>
      </div>
    </div>
  );
}

export default ExchangeTab;

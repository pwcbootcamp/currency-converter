import CurrencyInput from "./CurrencyInput";
import {useState, useEffect} from "react";
import axios from "axios";
import "./app.css"


function App() {

  const [firstAmount, setFirstAmount] = useState(1);
  const [secondAmount, setSecondAmount] = useState(1);
  const [firstCurrency, setFirstCurrency] = useState('USD');
  const [secondCurrency, setSecondCurrency] = useState('EUR');
  const [rates, setRates] = useState([]);

   useEffect(() => {
     axios.get('https://api.apilayer.com/exchangerates_data/latest?apikey=SlX6Kp060xUaKEKpe9st3AspHDHPcaJh')
       .then(response => {
         setRates(response.data.rates);
       })
  }, []);

   

  useEffect(() => {
     if (!!rates) {
         handleAmountFirstChange(1);
       }
       // eslint-disable-next-line
   }, [rates]); 



  function format(number) {
    return number.toFixed(4);
  }

  function handleAmountFirstChange(firstAmount) {
    setSecondAmount(format(firstAmount * rates[secondCurrency] / rates[firstCurrency]));
    setFirstAmount(firstAmount);
  }

  function handleCurrencyFirstChange(firstCurrency) {
    setSecondAmount(format(firstAmount * rates[secondCurrency] / rates[firstCurrency]));
    setFirstCurrency(firstCurrency);
  }

  function handleAmountSecondChange(secondAmount) {
    setFirstAmount(format(secondAmount * rates[firstCurrency] / rates[secondCurrency]));
    setSecondAmount(secondAmount);
  }

  function handleCurrencySecondChange(secondCurrency) {
    setFirstAmount(format(secondAmount * rates[firstCurrency] / rates[secondCurrency]));
    setSecondCurrency(secondCurrency);
  }


  return (
    <div className="converter">
      <div className="cover">
      <span className="appname" >CURRENCY CONVERTER</span>
      <CurrencyInput
        onAmountChange={handleAmountFirstChange}
        onCurrencyChange={handleCurrencyFirstChange}
        currencies={Object.keys(rates)}
        amount={firstAmount}
        currency={firstCurrency} />
      <CurrencyInput
        onAmountChange={handleAmountSecondChange}
        onCurrencyChange={handleCurrencySecondChange}
        currencies={Object.keys(rates)}
        amount={secondAmount}
        currency={secondCurrency} />


        <span className="result">{firstAmount}{firstCurrency} IS EQUIVALENT TO {secondAmount}{secondCurrency}</span>
        </div>

        
    </div>
  );
}

export default App;

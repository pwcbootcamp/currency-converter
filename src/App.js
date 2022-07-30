import { useEffect, useState } from 'react';
import './App.css';
//<img src={`https://flagcdn.com/48x36/${((e[0]).slice(0,2)).toLowerCase()}.png`} alt="flag" />
function App() {
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState('');
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    (async () => {
      const myHeaders = new Headers();
      myHeaders.append('apikey', 'LhILWJUh6vvu3Me8m9tPonAUpV459IXu');

      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };
      try {
        const fetchCurrency = await fetch(
          'https://api.apilayer.com/exchangerates_data/symbols',
          requestOptions
        );
        const formattedCurrencies = await fetchCurrency.json();
        if (currencies.length === 0) {
          setCurrencies(Object.entries(formattedCurrencies.symbols));
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [currencies]);
  const convert = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'LhILWJUh6vvu3Me8m9tPonAUpV459IXu');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    try {
      const convertFetch = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=NGN&from=${currency}&amount=${amount}`,
        requestOptions
      );
      const result = await convertFetch.json();
      setResult(result.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <header>Currency Converter</header>
        <form action="#" onSubmit={(e) => convert(e)}>
          <div className="amount">
            <p>Enter Amount</p>
            <input
              onChange={(e) => {
                setAmount(e.target.value);
                setResult(null);
              }}
              value={amount}
              type="text"
            />
          </div>
          <div className="drop-list">
            <div className="from">
              <p>From</p>
              <div className="select-box">
                <select
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setResult(null);
                  }}
                >
                  {currencies.map((e) => (
                    <option key={e[0]} value={e[0]}>
                      {e[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="icon">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <div className="to">
              <p>To</p>
              <div className="select-box">
                <img src="https://flagcdn.com/48x36/ng.png" alt="flag" />
                <select> </select>
              </div>
            </div>
          </div>
          <div className="exchange-rate">Getting exchange rate...</div>
          <button>Get Exchange Rate</button>
          {result ? `${amount} ${currency} = ${result} NGN` : ``}
        </form>
      </div>
    </div>
  );
}

export default App;

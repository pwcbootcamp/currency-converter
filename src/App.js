import { useEffect, useState } from 'react';
import image from './Currency.png';
import './App.css';

function App() {
  // const [currencies, setFromCurrencies] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const fetchCurrency = await fetch(
          'https://api.exchangerate.host/symbols'
        );
        const formattedCurrencies = await fetchCurrency.json();
        if (currencies.length === 0) {
          setCurrencies(Object.entries(formattedCurrencies.symbols));
        }
      } catch (error) {
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>;
        console.log(error.message);
      }
    })();
  }, [currencies]);
  // console.log(currencies.indexOf(['AED', {description: 'United Arab Emirates Dirham', code: 'AED'}]));

  const convert = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const convertFetch = await fetch(
        `https://api.exchangerate.host/convert?to=${toCurrency}&from=${currency}&amount=${amount}`
      );
      setLoading(false);
      const result = await convertFetch.json();
      setResult(result.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App row">
      <div
        className="col-xl-7 col-lg-4 col-md-4 
      col-sm-10 col-xs-4"
      >
        <img src={image} alt="" className="img" />
      </div>
      <div
        className="wrapper container-fluid col-xl-5 
      col-lg-8 col-md-8 col-sm-10 col-xs-4"
      >
        <header>Currency Converter</header>
        <form onSubmit={(e) => convert(e)}>
          <div className="amount">
            <p>Enter Amount</p>
            <input
              onChange={(e) => {
                setAmount(e.target.value);
                setResult(null);
              }}
              value={amount}
              type="number"
              required
              min="1"
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
                  <option></option>
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
                <select
                  onChange={(e) => {
                    setToCurrency(e.target.value);
                    setResult(null);
                  }}
                >
                  <option></option>
                  {currencies.map((e, index) => (
                    <option key={index} value={e[0]}>
                      {e[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {loading && (
            <div className="exchange-rate">Getting exchange rate...</div>
          )}
          <button
            style={{
              marginTop: !loading ? '5vmin' : 0,
              opacity: (!currency || !toCurrency) && '0.5',
            }}
            disabled={!currency || !toCurrency}
          >
            {!loading ? (
              'Get Exchange Rate'
            ) : (
              <div className="spinner-border" role="status" />
            )}
          </button>

          {result && (
            <div className="alert alert-success" role="alert">
              {`${amount} ${currency} = ${result} ${toCurrency}`}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;

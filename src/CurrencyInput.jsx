import PropTypes from "prop-types";
import "./app.css"

function CurrencyInput(props) {
  return (
    <div className="group">
      <input type="text" className="textInput" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
      <select className="selector" value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
        {props.currencies.map((currency => (
          <option value={currency}>{currency}</option>
        )))}
      </select>
    </div>
  );  
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
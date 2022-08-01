import "./App.css";
import Converter from "./features/converter/Converter";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h3>Currency converter</h3>
        <Converter />
      </div>
    </div>
  );
}

export default App;

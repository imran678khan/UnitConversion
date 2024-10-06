import "./App.css";
import LengthConversion from "./components/LengthConversion";
import TemperatureConversion from "./components/TemperatureConversion";
import WeightConversion from "./components/WeightConversion";

function App() {
  return (
    <>
      <div className="surface-0">
        <div className="text-900 font-bold text-6xl mb-4 text-center">
          Unit Conversion
        </div>
        <div className="text-700 text-xl mb-6 text-center line-height-3">
          List of available conversions.
        </div>

        <div className="grid">
          <div className="col-12 lg:col-4">
            <LengthConversion />
          </div>

          <div className="col-12 lg:col-4">
            <TemperatureConversion />
          </div>

          <div className="col-12 lg:col-4">
            <WeightConversion />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

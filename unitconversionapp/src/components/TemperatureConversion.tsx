import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useState } from "react";
import { fetchData, postData } from "../services/api";
import { ConversionType } from "./Types/ConversionType";
import { environment } from "../enviroments/environment";
import { ConversionTypeEnum } from "./Types/ConversionTypeEnum";
const TemperatureConversion: React.FC = () => {
  const [selectedFromUnit, setSelectedFromUnit] =
    useState<ConversionType | null>(null);
  const [selectedToUnit, setSelectedToUnit] = useState<ConversionType | null>(
    null
  );
  const [LengthConversionList, setLengthList] = useState<ConversionType[]>();

  const [valueFrom, setValueFrom] = useState<string>("");
  const [valueTo, setValueTo] = useState<string>("");

  useEffect(() => {
    GetUnits("Tempreature");
    // GetUnits("Weight");
    // GetUnits("Tempreature");
  }, []);

  const GetUnits = useCallback(async (type: string) => {
    try {
      const result = await fetchData(
        `${environment.apiService}/Convert?conversionType=` + type
      );
      setLengthList(result);
    } catch (error) {
      console.log("An error occurred while fetching data." + error);
    }
  }, []);

  const handleValueChange = async (
    newValue: string,
    fromUnit: string | null,
    toUnit: string | null
  ) => {
    setValueFrom(newValue);

    if (selectedFromUnit && selectedToUnit) {
      try {
        const requestBody = {
          leftUnit: fromUnit ?? selectedFromUnit.name,
          rightUnit: toUnit ?? selectedToUnit.name,
          value: parseFloat(newValue),
          leftToRight: true, // Set to true or false based on the conversion direction
          conversionType: ConversionTypeEnum.Temperature, // Define your conversion type here
        };

        const response = await postData(
          `${environment.apiService}/Convert`,
          requestBody
        );
        console.log(response);
        setValueTo(response?.convertedValue); // Assuming the API returns a converted value
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDropdownChange = (
    fromUnit: ConversionType | null,
    toUnit: ConversionType | null
  ) => {
    // Call handleValueChange when both dropdown values are set
    if (fromUnit && toUnit && valueFrom) {
      console.log(fromUnit, toUnit);
      handleValueChange(valueFrom, fromUnit.name, toUnit.name); // Call with the current input value
    }
  };

  const resultHtml =
    selectedFromUnit && selectedToUnit && valueFrom && valueTo ? (
      <div>
        <div>
          Converted From: <strong>{selectedFromUnit.name}</strong>
        </div>
        <div>
          Converted To: <strong>{selectedToUnit.name}</strong>
        </div>
        <div>
          Given Value: <strong>{valueFrom}</strong>
        </div>
        <div>
          Converted Value: <strong>{valueTo}</strong>
        </div>
      </div>
    ) : null;
  return (
    <div className="p-3 h-full">
      <div
        className="shadow-2 p-3 h-full flex flex-column"
        style={{ borderRadius: "6px" }}
      >
        <div className="text-900 font-medium text-xl mb-2">
          Tempreature Converter
        </div>
        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
        <div className="flex align-items-center">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">From</span>
            <Dropdown
              value={selectedFromUnit}
              onChange={(e) => {
                const newFromUnit = e.value;
                setSelectedFromUnit(newFromUnit);
                handleDropdownChange(newFromUnit, selectedToUnit); // Pass newFromUnit and current selectedToUnit
              }}
              options={LengthConversionList}
              optionLabel="name"
              placeholder="Select Unit"
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">To</span>
            <Dropdown
              value={selectedToUnit}
              onChange={(e) => {
                const newToUnit = e.value;
                setSelectedToUnit(newToUnit);
                handleDropdownChange(selectedFromUnit, newToUnit); // Pass current selectedFromUnit and newToUnit
              }}
              options={LengthConversionList}
              optionLabel="name"
              placeholder="Select Unit"
            />
          </div>
        </div>
        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
        <div className="flex align-items-center">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">From</span>
            <InputText
              name="ValueFrom"
              placeholder="Enter Value"
              value={valueFrom}
              onChange={(e) => handleValueChange(e.target.value, null, null)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">To</span>
            <InputText name="ValueTo" value={valueTo} />
          </div>
        </div>
        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
        <div id="LengthResult" className="text-600">
          {resultHtml}
        </div>
      </div>
    </div>
  );
};

export default TemperatureConversion;

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useState } from "react";
import { fetchData, postData } from "../services/api";
import { ConversionType } from "./Types/ConversionType";
import { environment } from "../enviroments/environment";
import { ConversionTypeEnum } from "./Types/ConversionTypeEnum";
const LengthConversion: React.FC = () => {
  const [selectedFromUnit, setSelectedFromUnit] =
    useState<ConversionType | null>(null);
  const [selectedToUnit, setSelectedToUnit] = useState<ConversionType | null>(
    null
  );
  const [LengthConversionList, setLengthList] = useState<ConversionType[]>();

  const [valueFrom, setValueFrom] = useState<string>("");
  const [valueTo, setValueTo] = useState<string>("");

  useEffect(() => {
    GetUnits("Length");
    // GetUnits("Weight");
    // GetUnits("Tempreature");
  }, []);

  const GetUnits = useCallback(async (type: string) => {
    try {
      const result = await fetchData(
        `${environment.apiService}/Convert?conversionType=` + type
      );
      if (type == "Length") setLengthList(result);
      // else if (type == "Weight") setWeightList(result);
      // else if (type == "Tempreature") setTempreatureList(result);
    } catch (error) {
      console.log("An error occurred while fetching data." + error);
    }
  }, []);

  const handleValueChange = async (newValue: string) => {
    setValueFrom(newValue);

    if (selectedFromUnit && selectedToUnit) {
      try {
        const requestBody = {
          leftUnit: selectedFromUnit.name,
          rightUnit: selectedToUnit.name,
          value: parseFloat(newValue),
          leftToRight: true, // Set to true or false based on the conversion direction
          conversionType: ConversionTypeEnum.Length, // Define your conversion type here
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
          Length Converter
        </div>
        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
        <div className="flex align-items-center">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">From</span>
            <Dropdown
              value={selectedFromUnit}
              onChange={(e) => setSelectedFromUnit(e.value)}
              options={LengthConversionList}
              optionLabel="name"
              placeholder="Select Unit"
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">To</span>
            <Dropdown
              value={selectedToUnit}
              onChange={(e) => setSelectedToUnit(e.value)}
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
              onChange={(e) => handleValueChange(e.target.value)}
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

export default LengthConversion;

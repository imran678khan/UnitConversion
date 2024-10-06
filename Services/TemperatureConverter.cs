
namespace Services
{
    public class TemperatureConverter: BaseUnitConverter
    {
        
        public TemperatureConverter(UnitFactors units,string leftUnit, string rightUnit)
        {
            Instantiate(units, leftUnit, rightUnit);
        }
        
    }
}

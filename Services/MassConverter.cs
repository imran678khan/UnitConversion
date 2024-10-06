
namespace Services
{
    using System;

    /// <summary>
    /// Converts between mass units.
    /// </summary>
    public class MassConverter : BaseUnitConverter
    {

        public MassConverter(UnitFactors units, string leftUnit, string rightUnit)
        {
            Instantiate(units, leftUnit, rightUnit);
        }
        
    }
}

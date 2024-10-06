using Models;

namespace Services.IService
{
    public interface IConversion
    {
        ConversionResponseDto GetConversion(string leftUnit, string rightUnit, double value, bool leftToRight, ConversionType conversionType);
        Task<List<UnitListResponseDto>> GetUnits(ConversionType conversionType);
    }
}

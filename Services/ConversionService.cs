using UnitConversion.Services.Exceptions;
using Microsoft.AspNetCore.Hosting;
using Models;
using Newtonsoft.Json;
using Services.IService;
namespace Services
{
    public class ConversionService : IConversion
    {

        private readonly IHostingEnvironment _hostingEnvironment;

        public ConversionService(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public ConversionResponseDto GetConversion(string leftUnit, string rightUnit, double value, bool leftToRight, ConversionType conversionType)
        {
            switch (conversionType)
            {

                case ConversionType.Length:
                    return GetLengthConvertion(leftUnit, rightUnit, value, leftToRight);
                    break;
                case ConversionType.Weight:
                    return GetWeightConvertion(leftUnit, rightUnit, value, leftToRight);
                    break;
                case ConversionType.Tempreature:
                    return GetTemperatureConvertion(leftUnit, rightUnit, value, leftToRight);
                    break;
                default: throw new NotImplementedException();
            }
        }

        public ConversionResponseDto GetLengthConvertion(string leftUnit, string rightUnit, double value, bool leftToRight)
        {

            if (string.IsNullOrEmpty(leftUnit))
                throw new BadRequestException("left unit is not valid");

            if (string.IsNullOrEmpty(rightUnit))
                throw new BadRequestException("right unit is not valid");


            var rootPath = _hostingEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, "LengthConfig.json");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            var unitList = JsonConvert.DeserializeObject<UnitList>(jsonData);

            var unitfactors = GetUnitFactors(unitList);

            var conversion = new DistanceConverter(unitfactors, leftUnit, rightUnit);

            double result = 0;
            
            if (leftToRight)
                result = conversion.LeftToRight(value);
            else
                result = conversion.RightToLeft(value);

            return new ConversionResponseDto { ConvertedValue = result};

        }

        public ConversionResponseDto GetTemperatureConvertion(string leftUnit, string rightUnit, double value, bool leftToRight)
        {

            if (string.IsNullOrEmpty(leftUnit))
                throw new BadRequestException("left unit is not valid");

            if (string.IsNullOrEmpty(rightUnit))
                throw new BadRequestException("right unit is not valid");


            var rootPath = _hostingEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, "TemperatureConfig.json");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            var unitList = JsonConvert.DeserializeObject<UnitList>(jsonData);

            var unitfactors = GetUnitFactors(unitList);

            var conversion = new TemperatureConverter(unitfactors, leftUnit, rightUnit);

            double result = 0;

            if (leftToRight)
                result = conversion.LeftToRight(value);
            else
                result = conversion.RightToLeft(value);

            return new ConversionResponseDto { ConvertedValue = result };

        }

        public ConversionResponseDto GetWeightConvertion(string leftUnit, string rightUnit, double value, bool leftToRight)
        {

            if (string.IsNullOrEmpty(leftUnit))
                throw new BadRequestException("left unit is not valid");

            if (string.IsNullOrEmpty(rightUnit))
                throw new BadRequestException("right unit is not valid");


            var rootPath = _hostingEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, "WeightConfig.json");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            var unitList = JsonConvert.DeserializeObject<UnitList>(jsonData);

            var unitfactors = GetUnitFactors(unitList);

            var conversion = new MassConverter(unitfactors, leftUnit, rightUnit);

            double result = 0;

            if (leftToRight)
                result = conversion.LeftToRight(value);
            else
                result = conversion.RightToLeft(value);

            return new ConversionResponseDto { ConvertedValue = result };

        }

        private UnitFactors GetUnitFactors(UnitList? unitList)
        {
            if (unitList == null)
                throw new BadRequestException("config value not found");

            UnitFactors units = new UnitFactors(unitList.BaseUnit);
            
            foreach (var unit in unitList.Units) 
            {
                units.Add(new UnitFactorSynonyms(unit.Synonyms.ToArray()), unit.Factor);
            }
            
            return units;
        }

        public async Task<List<UnitListResponseDto>> GetUnits(ConversionType conversionType)
        {

            var rootPath = _hostingEnvironment.ContentRootPath;

            var fullPath = string.Empty;

            switch (conversionType)
            {

                case ConversionType.Length:
                    fullPath = Path.Combine(rootPath, "LengthConfig.json");
                    break;
                case ConversionType.Weight:
                    fullPath = Path.Combine(rootPath, "WeightConfig.json");
                    break;
                case ConversionType.Tempreature:
                    fullPath = Path.Combine(rootPath, "TemperatureConfig.json");
                    break;
                default: throw new NotImplementedException();
            }

            var jsonData =await System.IO.File.ReadAllTextAsync(fullPath);

            var data= JsonConvert.DeserializeObject<UnitList>(jsonData);

            var units = data.Units.Select(x => new UnitListResponseDto { Factor = x.Factor, Name = x.Synonyms.FirstOrDefault() }).ToList();

            return units;
        }

    }
}

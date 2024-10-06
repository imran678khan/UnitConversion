using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.IService;

namespace UnitConversion.Controllers
{
    [ApiController]
   
    [Route("[controller]")]
    public class ConvertController : ControllerBase
    {

        private readonly IConversion _conversionService;

        public ConvertController(IConversion conversionService)
        {
            _conversionService = conversionService;
        }


        /// <summary>
        /// Converts a specified value from a source unit to a target unit.
        /// </summary>
        /// <returns>{convertedValue : (decimal)} .</returns>
        // Post: Convert

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<ConversionResponseDto> Post(ConversionRequestDto conversionRequestDto)
        {
            var response = _conversionService.GetConversion(conversionRequestDto.LeftUnit, conversionRequestDto.RightUnit, conversionRequestDto.value, conversionRequestDto.LeftToRight, conversionRequestDto.ConversionType);

            return Ok(response);
        }


        /// <summary>
        /// Get List of Units based conversionType.
        /// </summary>
        /// <returns>UnitList .</returns>
        // GET: Units

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<UnitListResponseDto>>> Get(ConversionType conversionType)
        {
            var response =await _conversionService.GetUnits(conversionType);

            return Ok(response);
        }

    }
}

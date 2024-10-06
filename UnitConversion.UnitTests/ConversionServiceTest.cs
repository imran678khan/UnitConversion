using UnitConversion.Services.Exceptions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Moq;
using Services;
using System.Threading;
using Models;
using Xunit;
using Services; // Adjust according to your namespace
using Models;   // Adjust according to your namespace
using UnitConversion.Services.Exceptions;
using FluentAssertions;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace UnitConversion.UnitTests
{
    public class ConversionServiceTest
    {
        private readonly Mock<IHostingEnvironment> _mockHostingEnvironment;
        private readonly ConversionService _conversionService;

        public ConversionServiceTest()
        {
            _mockHostingEnvironment = new Mock<IHostingEnvironment>();
            // Set the ContentRootPath using a dynamic approach
            var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            string searchString = "UnitConversion.UnitTests";

            int index = baseDirectory.IndexOf(searchString);
            string result = string.Empty;
            if (index >= 0)
            {
                 result = baseDirectory.Substring(0, index);
                
            }

            result += "UnitConversion";

            var contentRootPath = Path.Combine(result); // Navigate to the UnitConversion project

            _mockHostingEnvironment.Setup(m => m.ContentRootPath).Returns(contentRootPath);
            _conversionService = new ConversionService(_mockHostingEnvironment.Object);
        }


        [Fact]
        public void GetConversion_ValidLengthConversion_ReturnsConvertedValue()
        {
            // Arrange
            var leftUnit = "m";
            var rightUnit = "km";
            double value = 1000;
            bool leftToRight = true; // meters to kilometers
            var conversionType = ConversionType.Length;

            // Act
            var result = _conversionService.GetConversion(leftUnit, rightUnit, value, leftToRight, conversionType);

            // Assert
            result.Should().NotBeNull();
            result.ConvertedValue.Should().BeApproximately(1, 0.001); // Expecting approximately 1 km
        }


    }
}
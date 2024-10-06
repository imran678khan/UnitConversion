
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class ConversionRequestDto
    {
        [Required]
        public string LeftUnit { get; set; }

        [Required]
        public string RightUnit { get; set; }

        [Required]
        public double @value { get; set; }

        [Required]
        public bool LeftToRight { get; set; }

        [Required]
        public ConversionType ConversionType{ get; set; }

    }
}

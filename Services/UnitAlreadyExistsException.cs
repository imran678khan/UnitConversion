
namespace Services
{
    using System;

    /// <summary>
    /// Checks if the unit supplied is already covered.
    /// </summary>
    public class UnitAlreadyExistsException : Exception
    {
        internal UnitAlreadyExistsException() { }
        internal UnitAlreadyExistsException(string unit) : base(String.Format("The given unit synonym '{0}' is already used in this converter", unit)) { }
    }
}

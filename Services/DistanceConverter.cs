//-----------------------------------------------------------------------
// <copyright file="DistanceConverter.cs" company="George Kampolis">
//     Copyright (c) George Kampolis. All rights reserved.
//     Licensed under the MIT License, Version 2.0. See LICENSE.md in the project root for license information.
// </copyright>
//-----------------------------------------------------------------------


namespace Services
{
    using System;

    /// <summary>
    /// Converts between distance units.
    /// </summary>
    public class DistanceConverter : BaseUnitConverter
    {

        public DistanceConverter(UnitFactors units,string leftUnit, string rightUnit)
        {
            Instantiate(units, leftUnit, rightUnit);
        }
        
    }
}

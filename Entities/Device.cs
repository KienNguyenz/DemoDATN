using System;
using System.Collections.Generic;

namespace SMG.Entities;

public partial class Device
{
    public Guid Id { get; set; }

    public string DeviceName { get; set; } = null!;

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

    public string? Origin { get; set; }

    public string? Type { get; set; } 
}

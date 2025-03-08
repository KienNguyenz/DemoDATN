using System;
using System.Collections.Generic;

namespace SMG.Entities;

public partial class Package
{
    public Guid Id { get; set; }

    public string PackageName { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? Duration { get; set; }

}

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Package
{
    public Guid Id { get; set; }

    public string PackageName { get; set; } = null!;

    public decimal? Price { get; set; }

    public string? Duration { get; set; }
    public Guid BranchId { get; set; } 
    [JsonIgnore]
    public virtual Member? Member { get; set; }
}

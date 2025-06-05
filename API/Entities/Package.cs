using DemoGym.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DemoGym.Entities;

public partial class Package : BaseEntity
{
    public int Id { get; set; }

    public string PackageName { get; set; } = null!;

    public decimal? Price { get; set; }

    public string? Duration { get; set; }
    public int BranchId { get; set; }
    public string? Describe { get; set; }
    [JsonIgnore]
    public ICollection<Member> Members { get; set; } = new List<Member>();
}

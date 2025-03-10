using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Member
{
    public Guid Id { get; set; }

    public string MemName { get; set; } = null!;

    public DateOnly? Birthday { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }
    public Guid PackageId { get; set; }
    public Guid BranchId { get; set; }
    [JsonIgnore]
    public  Package? Package { get; set; }
}

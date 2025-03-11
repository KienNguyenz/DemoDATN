using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Branch
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;
    [JsonIgnore]
    public  List<Employee>? Employees { get; set; }
    [JsonIgnore]
    public  List<Room>? Rooms { get; set; }
    [JsonIgnore]
    public List<Package>? Packages { get; set; }

}

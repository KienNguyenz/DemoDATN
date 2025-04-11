using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Branch
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public  string  Description { get; set; }
    public string  Hotline { get; set; }
    public string Zalolink { get; set; }
    public string Address { get; set; } = null!;
    public string ImageUrl { get; set; }

    public  List<Employee>? Employees { get; set; }
    [JsonIgnore]
    public  List<Room>? Rooms { get; set; }
    [JsonIgnore]
    public List<Package>? Packages { get; set; }

}

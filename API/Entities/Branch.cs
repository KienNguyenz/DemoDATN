using DemoGym.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DemoGym.Entities;

public partial class Branch : BaseEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public  string  Description { get; set; }
    public string  Hotline { get; set; }
    public string Zalolink { get; set; }
    public string Address { get; set; } = null!;
    public string ImageUrl { get; set; }
    [JsonIgnore]
    public  List<Employee>? Employees { get; set; }
    [JsonIgnore]
    public  List<Room>? Rooms { get; set; }
    [JsonIgnore]
    public List<Package>? Packages { get; set; }
    [JsonIgnore]
    public virtual ICollection<Member> Members { get; set; } = new List<Member>();
}

﻿using DemoGym.Entities;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Employee
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public string NickName { get; set; } = null!;
    public string Describe { get; set; }
    public string Strength { get; set; }
    public string? Role { get; set; }
    public DateOnly? Birthday { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }
    public  string? PictureUrl { get; set; }
    public int BranchId { get; set; }
    [JsonIgnore]
    public virtual Salary? Salary { get; set; }
    [JsonIgnore]
    public virtual ICollection<PTMember> PTMembers { get; set; } = new List<PTMember>();
}

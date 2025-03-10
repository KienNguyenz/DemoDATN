using DemoGym.Entities;
using System;
using System.Collections.Generic;

namespace SMG.Entities;

public partial class Employee
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public DateOnly? Birthday { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }
    public Guid BranchId { get; set; }
    public virtual Salary? Salary { get; set; }
}

using System;
using System.Collections.Generic;

namespace SMG.Entities;

public partial class Employee
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Position { get; set; }

    public DateOnly? Birthday { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }


}

using DemoGym.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Member
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string? FirstName { get; set; } = null!;
    public string? LastName { get; set; } = null!;

    public string?  Email { get; set; }
    public DateTime? Birthday { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }
    public int? PackageId { get; set; }
    public string? Picture { get; set; }
    public string? AspNetUserID { get; set; }
    [JsonIgnore]
    public  Package? Package { get; set; }
    [JsonIgnore]
    public virtual PTMember? PTMember { get; set; } 
}

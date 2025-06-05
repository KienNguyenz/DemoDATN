using DemoGym.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DemoGym.Entities;

public partial class Room : BaseEntity
{
    public int Id { get; set; }

    public string RoomName { get; set; } = null!;
    public int BranchId { get; set; }

}

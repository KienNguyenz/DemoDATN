using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Room
{
    public Guid Id { get; set; }

    public string RoomName { get; set; } = null!;
    public Guid BranchId { get; set; }
    [JsonIgnore]
    public  List<Device>? Device { get; set; }
}

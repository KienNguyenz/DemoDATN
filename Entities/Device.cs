using DemoGym.Entities;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Device
{
    public Guid Id { get; set; }

    public string DeviceType { get; set; } = null!;
    public Guid RoomId { get; set; }
    [JsonIgnore]
    public virtual DevicesList? DevicesList { get; set; }
}

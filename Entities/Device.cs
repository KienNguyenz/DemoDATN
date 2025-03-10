using DemoGym.Entities;
using System;
using System.Collections.Generic;

namespace SMG.Entities;

public partial class Device
{
    public Guid Id { get; set; }

    public string DeviceType { get; set; } = null!;
    public Guid RoomId { get; set; }
    public virtual DevicesList? DevicesList { get; set; }
}

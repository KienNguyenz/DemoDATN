using System;
using System.Collections.Generic;

namespace SMG.Entities;

public partial class Room
{
    public Guid Id { get; set; }

    public string RoomName { get; set; } = null!;
    public List<Package>? packages { get; set; }

    public  List<Device>? Device { get; set; }
}

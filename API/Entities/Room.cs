﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SMG.Entities;

public partial class Room
{
    public int Id { get; set; }

    public string RoomName { get; set; } = null!;
    public int BranchId { get; set; }

}

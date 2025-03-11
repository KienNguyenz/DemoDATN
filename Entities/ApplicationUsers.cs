using Microsoft.AspNetCore.Identity;

namespace DemoGym.Entities
{
    public class ApplicationUsers :IdentityUser
    {
        public string?  FirstName { get; set; }
        public string?  LastName { get; set; }
        public string? Role { get; set; }
    }
}

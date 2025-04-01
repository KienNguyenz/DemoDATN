using Microsoft.AspNetCore.Identity;

namespace DemoGym.Entities
{
    public class ApplicationUsers : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Gender { get; set; }
        public string? Role { get; set; }
        public string? Picture { get; set; }
    }
}

using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace DemoGym.Models
{
    public class SignUpModel
    {
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        [Required]
        public string ConfirmPassword { get; set; } = null!;
        [Required]
        public string PhoneNumber { get; set; } = null!;
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public string Gender { get; set; }

        [Required]
        public string Role { get; set; } = null!;

    }
}

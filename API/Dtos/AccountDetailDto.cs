namespace DemoGym.Dtos
{
    public class AccountDetailDto
    {
        public string Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public string Gender { get; set; }
        public string? PhoneNumber { get; set; }
        // Role nếu muốn hiển thị (nhưng thường sẽ không cho sửa)
        public string Role { get; set; }
        public string? Picture { get; set; }
    }
}

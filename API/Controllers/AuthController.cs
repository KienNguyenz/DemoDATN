using DemoGym.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DemoGym.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUsers> userManager;
        private readonly IConfiguration configuration;
        private readonly HttpClient httpClient;

        public AuthController(UserManager<ApplicationUsers> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.httpClient = new HttpClient();
        }

        [HttpPost("facebook")]
        public async Task<IActionResult> FacebookLogin([FromBody] FacebookAuthDto authDto)
        {
            if (string.IsNullOrEmpty(authDto.Token))
                return Unauthorized();

            // Gọi API Graph của Facebook với URL được chuẩn hóa (không có khoảng trắng thừa)
            string fbUrl = $"https://graph.facebook.com/me?access_token={authDto.Token}&fields=id,first_name,email,last_name,name,picture,gender,birthday";
            var response = await httpClient.GetStringAsync(fbUrl);
            var userInfo = JObject.Parse(response);

            if (userInfo["id"] == null)
                return Unauthorized();

            string email = userInfo["email"]?.ToString();
            if (string.IsNullOrEmpty(email))
                return BadRequest(new { message = "Email không được cung cấp bởi Facebook." });

            string name = userInfo["name"]?.ToString() ?? "";
            string firstname = userInfo["first_name"]?.ToString() ?? "";
            string lastname = userInfo["last_name"]?.ToString() ?? "";
            // Lấy URL của ảnh đại diện từ đối tượng picture
            string picture = userInfo["picture"]?["data"]?["url"]?.ToString() ?? "";
            string gender = userInfo["gender"]?.ToString();
            string birthdayStr = userInfo["birthday"]?.ToString();

            // Parse birthday nếu có (có thể cần xử lý định dạng tùy thuộc vào dữ liệu từ Facebook)
            DateTime? birthday = null;
            if (!string.IsNullOrEmpty(birthdayStr))
            {
                // Thử parse theo định dạng MM/dd/yyyy
                if (DateTime.TryParseExact(birthdayStr, "MM/dd/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
                {
                    birthday = parsedDate;
                }
                else
                {
                    // Hoặc dùng DateTime.Parse nếu định dạng khác
                    birthday = DateTime.Parse(birthdayStr);
                }
            }

            // Kiểm tra xem user đã tồn tại chưa
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // Nếu chưa, tạo user mới với email làm UserName
                user = new ApplicationUsers
                {
                    UserName = email,
                    Email = email,
                    FirstName = name,
                    LastName = lastname,
                    Picture = picture,
                    Gender = gender,
                    Birthday = birthday,
                    Role = "Member",
                };

                var createResult = await userManager.CreateAsync(user);
                if (!createResult.Succeeded)
                    return BadRequest(new { message = "Không thể tạo tài khoản mới.", errors = createResult.Errors });

                // Thêm user vào role "Member"
                await userManager.AddToRoleAsync(user, "Member");
            }

            // Tạo JWT Token
            var token = await GenerateJwtToken(user);

            return Ok(new { token });
        }

        private async Task<string> GenerateJwtToken(ApplicationUsers user)
        {
            var authClaims = new List<Claim>
            {
                new Claim("email", user.Email),
                //new Claim("name", $"{user.LastName} {user.FirstName} "),
                new Claim("name", $"{user.FirstName}"),
                new Claim("nameid", user.Id),
                new Claim("role", "Member"),
                new Claim("gender", user.Gender ?? ""),
                new Claim("birthday", user.Birthday?.ToString("MM/dd/yyyy") ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var authKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(60),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authKey, SecurityAlgorithms.HmacSha256Signature)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class FacebookAuthDto
    {
        public string Token { get; set; }
    }
}

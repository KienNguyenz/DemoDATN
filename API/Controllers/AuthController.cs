using DemoGym.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.Data;
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

            // Xác thực token Facebook bằng cách gọi API Graph của Facebook
            var response = await httpClient.GetStringAsync($"https://graph.facebook.com/me?access_token={authDto.Token}&fields=id,first_name,email, last_name");
            var userInfo = JObject.Parse(response);

            if (userInfo["id"] == null)
                return Unauthorized();

            string email = userInfo["email"]?.ToString();
            string name = userInfo["first_name"]?.ToString();
            string lastname = userInfo["last_name"]?.ToString();

            // Kiểm tra xem user đã tồn tại trong hệ thống chưa
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                // Nếu chưa có user, tạo tài khoản mới
                user = new ApplicationUsers
                {
                    UserName = email,
                    Email = email,
                    FirstName = name,
                };

                var createResult = await userManager.CreateAsync(user);
                if (!createResult.Succeeded)
                    return BadRequest(new { message = "Không thể tạo tài khoản mới." });
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
            new Claim("name", user.FirstName),
            new Claim("nameid", user.Id),
            new Claim("role", "Member"),

            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
            
            //var userRoles = await userManager.GetRolesAsync(user);
            //foreach (var role in userRoles)
            //{
            //    authClaims.Add(new Claim("role", "Member"));
            //}

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
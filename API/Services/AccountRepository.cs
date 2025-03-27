using DemoGym.Entities;
using DemoGym.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MailKit.Net.Smtp;
using MimeKit;

namespace DemoGym.Services
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUsers> userManager;
        private readonly SignInManager<ApplicationUsers> signInManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;

        public AccountRepository(UserManager<ApplicationUsers> userManager,
            SignInManager<ApplicationUsers> signInManager,
            IConfiguration configuration, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
        }

        public async Task<string> SignInAsync(SignInModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);

            if(user == null || !passwordValid )
            {
                return string.Empty;
            }
            var authClaims = new List<Claim>
            {
                new Claim("email", user.Email), 
                new Claim("name",  $"{user.FirstName} {user.LastName}"), 
                new Claim("nameid", user.Id), 
                new Claim("phoneNumber", user.PhoneNumber),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var userRoles = await userManager.GetRolesAsync(user);
            foreach(var role in userRoles)
            {
                authClaims.Add(new Claim("role", role.ToString()));
            }
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                    issuer: configuration["JWT:ValidIssuer"],
                    audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddMinutes(5),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IdentityResult> SignUpAsync(SignUpModel model)
        {
            
            var user = new ApplicationUsers
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                UserName = model.Email,
                PhoneNumber = model.PhoneNumber,
                Role = model.Role
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
    {


        switch (model.Role)
        {
            case "Admin":
                model.Role = "Admin";
                break;
            case "Member":
                model.Role = "Member";
                break;
            default:
                model.Role = "Member";
                break;
        }

        if (!await roleManager.RoleExistsAsync(model.Role))
        {
            await roleManager.CreateAsync(new IdentityRole(model.Role));
        }
        
        await userManager.AddToRoleAsync(user, model.Role);
    }
    return result;
        }
    }
}

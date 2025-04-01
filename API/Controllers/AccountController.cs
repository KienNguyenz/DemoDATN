using DemoGym.Dtos;
using DemoGym.Entities;
using DemoGym.Models;
using DemoGym.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using NuGet.Common;
using System.Security.Claims;

namespace DemoGym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository accountRepo;
        private readonly UserManager<ApplicationUsers> _userManager;
        public AccountController(UserManager<ApplicationUsers> userManager, IAccountRepository repo)
        {
            _userManager = userManager;
            accountRepo  = repo;
        }
        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpModel signUpModel)
        {
            var result = await accountRepo.SignUpAsync(signUpModel);
            if(!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok(new AuthResponseDto
            {
                IsSuccess = true,
                Message = "Account Created Sucessfully"
            });
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInModel signInModel)
        {
            var result = await accountRepo.SignInAsync(signInModel);
            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "Invalid Password."
                });
            }

            return Ok(new AuthResponseDto
            {
                Token = result,
                IsSuccess = true,
                Message = "Login Success."
            });
        }

        [HttpGet("detail")]
        public async Task<IActionResult> GetAccountDetail()
        {
            // Lấy ID user từ Claims (hoặc JWT)
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found.");

            // Trả về thông tin cần thiết
            var result = new AccountDetailDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday,
                Gender = user.Gender,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                Picture = user is { } ? user.Picture : ""
            };
            return Ok(result);
        }

        // PUT: api/account/detail
        [HttpPut("detail")]
        public async Task<IActionResult> UpdateAccountDetail([FromBody] AccountDetailDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found.");

            // Cập nhật các trường cho phép
            user.Email = model.Email;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Birthday = model.Birthday;
            user.Gender = model.Gender;
            user.PhoneNumber = model.PhoneNumber;
            // Không cho sửa Role nếu bạn muốn, hoặc chỉ cho xem
            // user.Role = model.Role; // Nếu bạn KHÔNG muốn cho sửa, hãy bỏ dòng này.
            user.Picture = model.Picture;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { isSuccess = false, message = "Cập nhật thất bại." });
            }

            return Ok(new { isSuccess = true, message = "Cập nhật thành công." });
        }
    }
}

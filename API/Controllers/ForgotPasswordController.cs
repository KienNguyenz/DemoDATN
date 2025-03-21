﻿using DemoGym.Entities;
using DemoGym.Models;
using DemoGym.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUsers> _userManager;
    private readonly EmailService _emailService;

    public AuthController(UserManager<ApplicationUsers> userManager, EmailService emailService)
    {
        _userManager = userManager;
        _emailService = emailService;
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
            return BadRequest("Email không tồn tại!");

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var resetLink = $"http://localhost:4200/reset-password?email={model.Email}&token={token}";

        await _emailService.SendResetPasswordEmail(model.Email, resetLink);

        return Ok(new { message = "Link đặt lại mật khẩu đã được gửi!" });
    }
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
            return BadRequest("Tài khoản không tồn tại!");
        var decodedToken = System.Web.HttpUtility.UrlDecode(model.Token).Replace(" ", "+");
        var result = await _userManager.ResetPasswordAsync(user, decodedToken, model.Password);
        if (!result.Succeeded)
            return BadRequest("Mã token không hợp lệ hoặc đã hết hạn!");

        return Ok(new { message = "Mật khẩu đã được đổi thành công" });
    }

}

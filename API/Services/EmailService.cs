using MimeKit;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
namespace DemoGym.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendResetPasswordEmail(string userEmail, string resetLink)
        {
            var senderEmail = _config["EmailSettings:SenderEmail"];
            var senderPassword = _config["EmailSettings:SenderPassword"];

            if (string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(senderPassword))
            {
                throw new Exception("Cấu hình EmailSettings trong appsettings.json bị thiếu.");
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("DemoGym", senderEmail)); // Vẫn phải dùng SenderEmail thật
            message.ReplyTo.Add(new MailboxAddress(userEmail, userEmail)); // Đặt Reply-To là email người dùng
            message.To.Add(new MailboxAddress("", userEmail)); // Gửi đến chính user
            message.Subject = "Yêu cầu đặt lại mật khẩu";

            message.Body = new TextPart("html")
            {
                Text = $"Click vào <a href='{resetLink}'>đây</a> để đặt lại mật khẩu."
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(_config["EmailSettings:SmtpServer"], 587, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(senderEmail, senderPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }



    }
}

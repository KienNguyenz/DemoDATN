﻿using DemoGym.Models;
using Microsoft.AspNetCore.Identity;

namespace DemoGym.Services
{
    public interface IAccountRepository
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel model);
        public Task<string> SignInAsync(SignInModel model);

    }
}

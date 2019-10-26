using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DollaWeb.Models;

namespace DollaWeb.Controllers
{
    
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DollaWebContext _context;
        private SignInManager<ApplicationUser> signInManager;
        private UserManager<ApplicationUser> userManager;

        public UserController(DollaWebContext context, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        // POST: api/User/register
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterViewModel registerViewModel)
        {
            ApplicationUser newUser = new ApplicationUser()
            {
                Email = registerViewModel.Email,
                UserName = registerViewModel.UserName
            };
            var result = userManager.CreateAsync(newUser, registerViewModel.Password).GetAwaiter().GetResult();
            return new ObjectResult(result);
        }

        //POST: api/User/login
        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginViewModel loginViewModel)
        {
            var auth = User.Identity.IsAuthenticated;
            var user = User.Identity.Name;
            var result = signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, loginViewModel.rememberMe, false).GetAwaiter().GetResult();
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            signInManager.SignOutAsync();
            return Ok();
        }



    }

}

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

            var userId = userManager.GetUserId(User);

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

        [Authorize]
        [HttpPut("changePass")]
        public async Task<IActionResult> changePassAsync([FromBody]SettingsViewModel settingsViewModel)
        {
            //ApplicationUser loggedUser = new ApplicationUser { UserName = userManager.GetUserName(User) };
            //var userId = await userManager.GetUserNameAsync(loggedUser);
            var user = await userManager.FindByNameAsync(userManager.GetUserName(User));

            var result = await userManager.ChangePasswordAsync(user, settingsViewModel.currentPass, settingsViewModel.newPass);

            //var user =  userManager.FindByIdAsync(userId);

            //var token = userManager.GeneratePasswordResetTokenAsync(User);

            //var result = await UserManager.ResetPasswordAsync(user, token, "MyN3wP@ssw0rd");

            if (result.Succeeded)
            {
                await signInManager.SignOutAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        /*
        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Username)
            {
                return BadRequest();
            }
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(string id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private bool UserExists(string id)
        {
            return _context.User.Any(e => e.Username == id);
        }
        */
    }

}

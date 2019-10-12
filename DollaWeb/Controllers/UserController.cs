//UNUSED

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

            //ApplicationUser signedUser = userManager.FindByEmailAsync(loginViewModel.Email);
            //var user = signInManager.UserManager.FindByNameAsync(loginViewModel.UserName);
            //var password = userManager.CheckPasswordAsync(user, loginViewModel.Password);



            var result = signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, loginViewModel.rememberMe, false).GetAwaiter().GetResult();
            if (result.Succeeded)
            {
                return new ObjectResult(result);
            }
            else
            {
                return new ObjectResult(result);
            }
            

        }


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

        // POST: api/User
        //[HttpPost]
        //public async Task<ActionResult<User>> PostUser(User user)
        //{
         //   _context.User.Add(user);
         //   await _context.SaveChangesAsync();
//
 //           return CreatedAtAction("GetUser", new { id = user.Username }, user);
  //      }

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
    }
}

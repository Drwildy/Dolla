using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DollaWeb.Models;
using Microsoft.AspNetCore.Identity;

namespace DollaWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalariesController : ControllerBase
    {
        private readonly DollaWebContext _context;
        private UserManager<ApplicationUser> _userManager;

        public SalariesController(DollaWebContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Salaries
        [HttpGet]
        public async Task<ActionResult<Salary>> GetSalaries()
        {
            return (await _context.Salaries.Where(s => s.ApplicationUser == _userManager.GetUserId(User)).ToListAsync()).FirstOrDefault();
        }

        // PUT: api/Salaries
        [HttpPut]
        public async Task<IActionResult> PutSalary(Salary salary)
        {
            if (SalaryExists())
            {
                var dbSalary = _context.Salaries.First(s => s.ApplicationUser == _userManager.GetUserId(User));
                dbSalary.SalaryAmount = salary.SalaryAmount;
                dbSalary.IsSalary = salary.IsSalary;

                _context.Entry(dbSalary).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                    return NoContent();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
            }
            else
            {
                salary.ApplicationUser = _userManager.GetUserId(User);
                _context.Salaries.Add(salary);
                await _context.SaveChangesAsync();

                return NoContent();
            }
        }

        private bool SalaryExists()
        {
            return _context.Salaries.Where(s => s.ApplicationUser == _userManager.GetUserId(User)).Any();
        }
    }
}

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
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AddPaymentMethodsController : ControllerBase
    {
        private readonly DollaWebContext _context;
        private UserManager<ApplicationUser> userManager;

        public AddPaymentMethodsController(DollaWebContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        // GET: api/AddPaymentMethods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddPaymentMethod>>> GetAddPaymentMethod()
        {

            return await _context.AddPaymentMethod.Where(x => x.ApplicationUserId == userManager.GetUserId(User)).ToListAsync();
            //return await _context.AddPaymentMethod.ToListAsync();
        }

        // GET: api/AddPaymentMethods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AddPaymentMethod>> GetAddPaymentMethod(int id)
        {
            var addPaymentMethod = await _context.AddPaymentMethod.FindAsync(id);

            if (addPaymentMethod == null)
            {
                return NotFound();
            }

            return addPaymentMethod;
        }

        // PUT: api/AddPaymentMethods/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddPaymentMethod(int id, AddPaymentMethod addPaymentMethod)
        {
            if (id != addPaymentMethod.Id)
            {
                return BadRequest();
            }

            _context.Entry(addPaymentMethod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddPaymentMethodExists(id))
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

        // POST: api/AddPaymentMethods
        [HttpPost]
        public async Task<ActionResult<AddPaymentMethod>> PostAddPaymentMethod(AddPaymentMethod addPaymentMethod)
        {
            //This Line gets the active UserID and adds it as a FK to the APM
            addPaymentMethod.ApplicationUserId = userManager.GetUserId(User);

            _context.AddPaymentMethod.Add(addPaymentMethod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddPaymentMethod", new { id = addPaymentMethod.Id }, addPaymentMethod);
        }

        // DELETE: api/AddPaymentMethods/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AddPaymentMethod>> DeleteAddPaymentMethod(int id)
        {
            var addPaymentMethod = await _context.AddPaymentMethod.FindAsync(id);
            if (addPaymentMethod == null)
            {
                return NotFound();
            }

            _context.AddPaymentMethod.Remove(addPaymentMethod);
            await _context.SaveChangesAsync();

            return addPaymentMethod;
        }

        private bool AddPaymentMethodExists(int id)
        {
            return _context.AddPaymentMethod.Any(e => e.Id == id);
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DollaWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace DollaWeb.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly DollaWebContext _context;
        private UserManager<ApplicationUser> userManager;

        public BillsController(DollaWebContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.userManager = userManager;

        }

        // GET: api/Bills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bill>>> GetBill()
        {

            var user = User.Identity.Name;

            return await _context.Bill.ToListAsync();

            //return (await _context.Bill.ToListAsync()).Where(bill => bill.Username == user);
        }

        // GET: api/Bills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetBill(int id)
        {
            var bill = await _context.Bill.FindAsync(id);

            if (bill == null)
            {
                return NotFound();
            }

            return bill;
        }

        // PUT: api/Bills/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBill(int id, Bill bill)
        {
            if (id != bill.Id)
            {
                return BadRequest();
            }

            _context.Entry(bill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BillExists(id))
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

        // POST: api/Bills
        [HttpPost]
        public async Task<ActionResult<Bill>> PostBill(Bill bill)
        {

            //This Line gets the active UserID and adds it as a FK to the Bill
            bill.ApplicationUserId = userManager.GetUserId(User);

            _context.Bill.Add(bill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBill", new { id = bill.Id }, bill);
        }

        // DELETE: api/Bills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Bill>> DeleteBill(int id)
        {
            var bill = await _context.Bill.FindAsync(id);
            if (bill == null)
            {
                return NotFound();
            }

            _context.Bill.Remove(bill);
            await _context.SaveChangesAsync();

            return bill;
        }

        private bool BillExists(int id)
        {
            return _context.Bill.Any(e => e.Id == id);
        }
    }
}

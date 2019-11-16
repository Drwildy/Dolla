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
    public class PaidBillsController : ControllerBase
    {
        private readonly DollaWebContext _context;
        private UserManager<ApplicationUser> userManager;

        public PaidBillsController(DollaWebContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        // GET: api/PaidBills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaidBill>>> GetPaidBill()
        {
            return await _context.PaidBill.ToListAsync();
        }

        // GET: api/PaidBills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetPaidBill(int id)
        {
            var paidBills = await _context.PaidBill.Where(x => x.BillId == id).ToListAsync();
            //var envelope = await _context.Envelope.Where(x => x.MoneyBoxType == 1).ToListAsync();

            if (paidBills == null)
            {
                return NotFound();
            }

            return paidBills;
        }

        // PUT: api/PaidBills/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaidBill(int id, PaidBill paidBill)
        {
            if (id != paidBill.Id)
            {
                return BadRequest();
            }

            _context.Entry(paidBill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaidBillExists(id))
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

        // POST: api/PaidBills
        [HttpPost]
        public async Task<ActionResult<PaidBill>> PostPaidBill(PaidBill paidBill)
        {
            _context.PaidBill.Add(paidBill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaidBill", new { id = paidBill.Id }, paidBill);
        }

        // DELETE: api/PaidBills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PaidBill>> DeletePaidBill(int id)
        {
            var paidBill = await _context.PaidBill.FindAsync(id);
            if (paidBill == null)
            {
                return NotFound();
            }

            _context.PaidBill.Remove(paidBill);
            await _context.SaveChangesAsync();

            return paidBill;
        }

        private bool PaidBillExists(int id)
        {
            return _context.PaidBill.Any(e => e.Id == id);
        }
    }
}

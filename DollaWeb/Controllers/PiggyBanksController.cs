using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DollaWeb.Models;

namespace DollaWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiggyBanksController : ControllerBase
    {
        private readonly DollaWebContext _context;

        public PiggyBanksController(DollaWebContext context)
        {
            _context = context;
        }

        // GET: api/PiggyBanks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiggyBank>>> GetPiggyBank()
        {
            return await _context.PiggyBank.ToListAsync();
        }

        // GET: api/PiggyBanks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiggyBank>> GetPiggyBank(int id)
        {
            var piggyBank = await _context.PiggyBank.FindAsync(id);

            if (piggyBank == null)
            {
                return NotFound();
            }

            return piggyBank;
        }

        // PUT: api/PiggyBanks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiggyBank(int id, PiggyBank piggyBank)
        {
            if (id != piggyBank.Id)
            {
                return BadRequest();
            }

            _context.Entry(piggyBank).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiggyBankExists(id))
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

        // POST: api/PiggyBanks
        [HttpPost]
        public async Task<ActionResult<PiggyBank>> PostPiggyBank(PiggyBank piggyBank)
        {
            _context.PiggyBank.Add(piggyBank);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiggyBank", new { id = piggyBank.Id }, piggyBank);
        }

        // DELETE: api/PiggyBanks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiggyBank>> DeletePiggyBank(int id)
        {
            var piggyBank = await _context.PiggyBank.FindAsync(id);
            if (piggyBank == null)
            {
                return NotFound();
            }

            _context.PiggyBank.Remove(piggyBank);
            await _context.SaveChangesAsync();

            return piggyBank;
        }

        private bool PiggyBankExists(int id)
        {
            return _context.PiggyBank.Any(e => e.Id == id);
        }
    }
}

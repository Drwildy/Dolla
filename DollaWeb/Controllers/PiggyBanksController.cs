using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DollaWeb.Models;
using Microsoft.AspNetCore.Authorization;

namespace DollaWeb.Controllers
{
    [Authorize]
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
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutPiggyBank(int id, PiggyBank piggyBank)
        //{
        //    if (id != piggyBank.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(piggyBank).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PiggyBankExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}
        //adding to a piggy bank
        [HttpPut("{id}")]
        public async Task<ActionResult<PiggyBank>> PutPiggyBank(int id, TransferInfo info)
        {
            //if (id != piggyBank.Id)
            //{
            //    return BadRequest();
            //}
            //var pigBank = new PiggyBank() { Id = id, Amount = newAmount };
            //_context.Entry(piggyBank).State = EntityState.Modified;
            var pigBank = _context.PiggyBank.First(a => a.Id == id);
            double amount = pigBank.Amount;
            if (info.type == "To")
                amount = amount + info.amount;
            else if (info.type == "From")
                amount = amount - info.amount;
            pigBank.Amount = amount;

            _context.Entry(pigBank).State = EntityState.Modified;
            try
            {
                
                
                await _context.SaveChangesAsync();
                //_context.PiggyBank.Where(c => c.Id == id).Update()
                //_context.PiggyBank.Attach(pigBank);
                //_context.Entry(pigBank).Property(x => x.Amount).IsModified = true;
                //await _context.SaveChangesAsync();
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
            return pigBank;
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

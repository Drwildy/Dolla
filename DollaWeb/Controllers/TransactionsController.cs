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
    public class TransactionsController : ControllerBase
    {
        private readonly DollaWebContext _context;
        private UserManager<ApplicationUser> userManager;

        public TransactionsController(DollaWebContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        // GET: api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransaction()
        {
            var user = User.Identity.Name;
            return await _context.Transaction.Where(t => 
                t.ApplicationUserId == userManager.GetUserId(User))
                .ToListAsync();
        }

        // GET: api/Transactions
        [HttpGet("{months}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> FilterTransactions([FromRoute] string strMonths)
        {
            //Console.Write("httpget filter");
            var user = User.Identity.Name;
            var span = Convert.ToInt32(strMonths);
            var currentMonth = DateTime.Now.Month;
            switch (span)
            {
                // this month
                case 1: return await _context.Transaction.Where(t =>
                    t.ApplicationUserId == userManager.GetUserId(User)
                    && t.TransactionDate.Month == currentMonth).ToListAsync();
                // 3 months (going to have bugs - need to loop around 12->1)
                case 3: return await _context.Transaction.Where(t =>
                    t.ApplicationUserId == userManager.GetUserId(User)
                    && 
                      ((t.TransactionDate.Month == currentMonth)
                    || (t.TransactionDate.Month - 1) == (currentMonth - 1)
                    || (t.TransactionDate.Month - 2) == (currentMonth - 2)))
                    .ToListAsync();
                // 6 months (going to have bugs - need to loop around 12->1)
                case 6: return await _context.Transaction.Where(t =>
                    t.ApplicationUserId == userManager.GetUserId(User)
                    &&
                      ((t.TransactionDate.Month == currentMonth)
                    || (t.TransactionDate.Month - 1) == (currentMonth - 1)
                    || (t.TransactionDate.Month - 2) == (currentMonth - 2)
                    || (t.TransactionDate.Month - 3) == (currentMonth - 3)
                    || (t.TransactionDate.Month - 4) == (currentMonth - 4)
                    || (t.TransactionDate.Month - 5) == (currentMonth - 5)))
                    .ToListAsync();
                // this year
                case 12: return await _context.Transaction.Where(t =>
                    t.ApplicationUserId == userManager.GetUserId(User)
                    && t.TransactionDate.Year == DateTime.Now.Year).ToListAsync();
                // all
                default: return await _context.Transaction.Where(t =>
                    t.ApplicationUserId == userManager.GetUserId(User)).ToListAsync();
            }
        }
        
        // GET: api/Transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transaction.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        // PUT: api/Transactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
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

        // POST: api/Transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {

            //This Line gets the active UserID and adds it as a FK to the PB
            transaction.ApplicationUserId = userManager.GetUserId(User);

            _context.Transaction.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaction", new { id = transaction.Id }, transaction);
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Transaction>> DeleteTransaction(int id)
        {
            var transaction = await _context.Transaction.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transaction.Remove(transaction);
            await _context.SaveChangesAsync();

            return transaction;
        }

        private bool TransactionExists(int id)
        {
            return _context.Transaction.Any(e => e.Id == id);
        }
    }
}

﻿using System;
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

    [Route("api/[controller]")]
    [ApiController]
    public class EnvelopesController : ControllerBase
    {
        private readonly DollaWebContext _context;
        private UserManager<ApplicationUser> userManager;

        public EnvelopesController(DollaWebContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        // GET: api/Envelopes/TestConnection
        [HttpGet("TestConnection")]
        public string TestConnection()
        {
            try
            {
                return _context.Moneybox.Any() ? "Connected to Database" : "Not finding any moneyboxes - probably not connected";
            }
            catch (Exception e)
            {
                return "Connection failed: " + e.Message;
            }
        }

        // GET: api/Envelopes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Envelope>>> GetEnvelope()
        {
            //return await _context.Envelope.ToListAsync();
            return await _context.Envelope.Where(x => x.MoneyBoxType == 1 && x.ApplicationUserId == userManager.GetUserId(User)).ToListAsync();
        }

        // GET: api/Envelopes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Envelope>> GetEnvelope(int id)
        {
            var envelope = await _context.Envelope.FindAsync(id);
            //var envelope = await _context.Envelope.Where(x => x.MoneyBoxType == 1).ToListAsync();

            if (envelope == null)
            {
                return NotFound();
            }

            return envelope;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchEnvelope(int id, Envelope envelope)
        {
            if (id != envelope.Id)
            {
                return BadRequest();
            }

            _context.Entry(envelope).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnvelopeExists(id))
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

       
        [HttpPut("{id}")]
        public async Task<ActionResult<Envelope>> PutEnvelope(int id, TransferInfo info)
        {
            //if (id != piggyBank.Id)
            //{
            //    return BadRequest();
            //}
            //var pigBank = new PiggyBank() { Id = id, Amount = newAmount };
            //_context.Entry(piggyBank).State = EntityState.Modified;
            var envelope = _context.Envelope.First(a => a.Id == id);
            double amount = envelope.Amount;
            if (info.type == "To")
                amount = amount + info.amount;
            else if (info.type == "From")
                amount = amount - info.amount;
            envelope.Amount = amount;

            _context.Entry(envelope).State = EntityState.Modified;
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
                if (!EnvelopeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return envelope;
        }


    
        // POST: api/Envelopes
        [HttpPost]
        public async Task<ActionResult<Envelope>> PostEnvelope(Envelope envelope)
        {
            try
            {
               
                //This Line gets the active UserID and adds it as a FK to the Envelope
                envelope.ApplicationUserId = userManager.GetUserId(User);

                _context.Envelope.Add(envelope);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEnvelope", new { id = envelope.Id }, envelope);
            }
            catch
            {
                throw;
            }
        }

        // DELETE: api/Envelopes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Envelope>> DeleteEnvelope(int id)
        {
            var envelope = await _context.Envelope.FindAsync(id);
            if (envelope == null)
            {
                return NotFound();
            }

            _context.Envelope.Remove(envelope);
            await _context.SaveChangesAsync();

            return envelope;
        }

        private bool EnvelopeExists(int id)
        {
            return _context.Envelope.Any(e => e.Id == id);
        }
    }
}

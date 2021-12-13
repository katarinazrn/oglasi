using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployersController : ControllerBase
    {
        private readonly JobsContext _context;

        public EmployersController(JobsContext context)
        {
            _context = context;
        }

        // GET: api/Employers
        [HttpGet]
        public IEnumerable<Employer> GetEmployers()
        {
            return _context.Employers;
        }

        // GET: api/Employers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployer([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employer = await _context.Employers.FindAsync(id);

            if (employer == null)
            {
                return NotFound();
            }

            return Ok(employer);
        }

        // PUT: api/Employers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployer([FromRoute] long id, [FromBody] Employer employer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employer.id)
            {
                return BadRequest();
            }

            _context.Entry(employer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployerExists(id))
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

        // POST: api/Employers
        [HttpPost]
        public async Task<IActionResult> PostEmployer([FromBody] Employer employer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Employers.Add(employer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployer", new { id = employer.id }, employer);
        }

        // DELETE: api/Employers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployer([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employer = await _context.Employers.FindAsync(id);
            if (employer == null)
            {
                return NotFound();
            }

            _context.Employers.Remove(employer);
            await _context.SaveChangesAsync();

            return Ok(employer);
        }

        private bool EmployerExists(long id)
        {
            return _context.Employers.Any(e => e.id == id);
        }
    }
}
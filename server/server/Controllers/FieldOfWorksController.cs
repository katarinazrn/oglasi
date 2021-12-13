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
    public class FieldOfWorksController : ControllerBase
    {
        private readonly JobsContext _context;

        public FieldOfWorksController(JobsContext context)
        {
            _context = context;
        }

        // GET: api/FieldOfWorks
        [HttpGet]
        public IEnumerable<FieldOfWork> GetFieldsOfWork()
        {
            return _context.FieldsOfWork;
        }

        // GET: api/FieldOfWorks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFieldOfWork([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fieldOfWork = await _context.FieldsOfWork.FindAsync(id);

            if (fieldOfWork == null)
            {
                return NotFound();
            }

            return Ok(fieldOfWork);
        }

        // PUT: api/FieldOfWorks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFieldOfWork([FromRoute] long id, [FromBody] FieldOfWork fieldOfWork)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != fieldOfWork.id)
            {
                return BadRequest();
            }

            _context.Entry(fieldOfWork).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FieldOfWorkExists(id))
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

        // POST: api/FieldOfWorks
        [HttpPost]
        public async Task<IActionResult> PostFieldOfWork([FromBody] FieldOfWork fieldOfWork)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.FieldsOfWork.Add(fieldOfWork);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFieldOfWork", new { id = fieldOfWork.id }, fieldOfWork);
        }

        // DELETE: api/FieldOfWorks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFieldOfWork([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fieldOfWork = await _context.FieldsOfWork.FindAsync(id);
            if (fieldOfWork == null)
            {
                return NotFound();
            }

            _context.FieldsOfWork.Remove(fieldOfWork);
            await _context.SaveChangesAsync();

            return Ok(fieldOfWork);
        }

        private bool FieldOfWorkExists(long id)
        {
            return _context.FieldsOfWork.Any(e => e.id == id);
        }
    }
}
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
    public class JobListingsController : ControllerBase
    {
        private readonly JobsContext _context;

        public JobListingsController(JobsContext context)
        {
            _context = context;
        }

        // GET: api/JobListings
        [HttpGet]
        public IEnumerable<JobListing> GetJobListings()
        {
            return _context.JobListings;
        }

        // GET: api/JobListings/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobListing([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobListing = await _context.JobListings.FindAsync(id);

            if (jobListing == null)
            {
                return NotFound();
            }

            return Ok(jobListing);
        }

        // POST: api/JobListings/filter
        [HttpPost("filter")]
        public async Task<IActionResult> GetFilteredJobListings([FromBody] Filter filter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<JobListing> jobListings = _context.JobListings.ToList();

            if (filter.location!="")
            {
                jobListings = jobListings.Where(x => x.location == filter.location).ToList();
            }

            if (filter.senioriy != "")
            {
                jobListings = jobListings.Where(x => x.seniority == filter.senioriy).ToList();
            }

            if (filter.fieldOfWork != "")
            {
                jobListings = jobListings.Where(x => x.filedOfWork == filter.fieldOfWork).ToList();
            }

            if (filter.titleOrKeywords != "")
            {
                jobListings = jobListings.Where(x => x.title.ToLower().Contains(filter.titleOrKeywords)
                || x.tags.ToLower().Contains(filter.titleOrKeywords)).ToList();
            }

            if (jobListings == null)
            {
                return NotFound();
            }

            return Ok(jobListings);
        }

        // PUT: api/JobListings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobListing([FromRoute] long id, [FromBody] JobListing jobListing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jobListing.id)
            {
                return BadRequest();
            }

            _context.Entry(jobListing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobListingExists(id))
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

        // POST: api/JobListings
        [HttpPost]
        public async Task<IActionResult> PostJobListing([FromBody] JobListing jobListing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.JobListings.Add(jobListing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobListing", new { id = jobListing.id }, jobListing);
        }

        // DELETE: api/JobListings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobListing([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobListing = await _context.JobListings.FindAsync(id);
            if (jobListing == null)
            {
                return NotFound();
            }

            _context.JobListings.Remove(jobListing);
            await _context.SaveChangesAsync();

            return Ok(jobListing);
        }

        private bool JobListingExists(long id)
        {
            return _context.JobListings.Any(e => e.id == id);
        }
    }
}
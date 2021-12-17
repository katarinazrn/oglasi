using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    [EnableCors("MyPolicy")]
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
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<JobListing> GetJobListings()
        {
            return _context.JobListings;
        }

        // GET: api/JobListings/5
        [AllowAnonymous]
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
        [AllowAnonymous]
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
                jobListings = jobListings.Where(x => x.fieldOfWork == filter.fieldOfWork).ToList();
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

            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (long.Parse(identity.Name) != jobListing.employerId)
            {
                return Unauthorized();
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

            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (long.Parse(identity.Name) != jobListing.employerId)
            {
                return Unauthorized();
            }

            long id;
            using (var context = new JobsContext())
            {
                context.JobListings.Add(jobListing);
                context.SaveChanges();

                id= jobListing.id; 
            }

            var location = _context.Locations.Where(x => x.name == jobListing.location.ToLower()).FirstOrDefault();
            if (location==null)
            {
                location = new Location();
                location.name = jobListing.location.ToLower();
                _context.Locations.Add(location);
            }

            var field = _context.FieldsOfWork.Where(x => x.name == jobListing.fieldOfWork.ToLower()).FirstOrDefault();
            if (field == null)
            {
                field = new FieldOfWork();
                field.name = jobListing.fieldOfWork.ToLower();
                _context.FieldsOfWork.Add(field);
            }

            await _context.SaveChangesAsync();

            return Ok(_context.JobListings.Where(j=>j.id==id).FirstOrDefault());
        }

        // DELETE: api/JobListings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobListing([FromBody] JobListing jobListing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (long.Parse(identity.Name) != jobListing.employerId)
            {
                return Unauthorized();
            }

            var jl = await _context.JobListings.FindAsync(jobListing.id);
            if (jl == null)
            {
                return NotFound();
            }

            _context.JobListings.Remove(jl);
            await _context.SaveChangesAsync();

            return Ok(jl);
        }

        private bool JobListingExists(long id)
        {
            return _context.JobListings.Any(e => e.id == id);
        }
    }
}
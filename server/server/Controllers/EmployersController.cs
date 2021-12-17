using System;
using System.Collections.Generic;
using System.IO;
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
    public class EmployersController : ControllerBase
    {
        private readonly JobsContext _context;
        private readonly IJWTAuthenticationManager jwtAuthenticationManager;

        public EmployersController(JobsContext context, IJWTAuthenticationManager jwt)
        {
            _context = context;
            jwtAuthenticationManager = jwt;
        }

        // GET: api/Employers
        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<Employer> GetEmployers()
        {
            return _context.Employers;
        }

        // GET: api/Employers/5
        [HttpGet("{id}")]
        [AllowAnonymous]
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

        string HashString(string text)
        {
            string salt = "123fds";
            if (String.IsNullOrEmpty(text))
            {
                return String.Empty;
            }

            using (var sha = new System.Security.Cryptography.SHA256Managed())
            {
                byte[] textBytes = System.Text.Encoding.UTF8.GetBytes(text + salt);
                byte[] hashBytes = sha.ComputeHash(textBytes);

                string hash = BitConverter
                    .ToString(hashBytes)
                    .Replace("-", String.Empty);

                return hash;
            }
        }

        // POST: api/Employers/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Employer e)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employer = _context.Employers.Where(x => x.email == e.email && x.password == HashString(e.password)).FirstOrDefault();

            if (employer == null)
            {
                return NotFound();
            }

            var token = jwtAuthenticationManager.Authenticate(employer);

            if (token == null)
            {
                return Unauthorized();
            }

            AuthenticatedUser au = new AuthenticatedUser();
            au.address = employer.address;
            au.description = employer.description;
            au.email = employer.email;
            au.fieldOfWork = employer.fieldOfWork;
            au.id = employer.id;
            au.imageUrl = employer.imageUrl;
            au.name = employer.name;
            au.phone = employer.phone;
            au.PIB = employer.PIB;
            au.token = token;
            au.website = employer.website;

            return Ok(au);
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
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostEmployer([FromForm] NewEmployer employer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Employers.Where(x => x.email == employer.email).ToList().Count()>0)
            {
                return BadRequest();
            }

            Employer e = new Employer();
            
            e.password = HashString(employer.password);
            e.phone = employer.phone;
            e.PIB = employer.PIB;
            e.website = employer.website;
            e.email = employer.email;
            e.description = employer.description;
            e.address = employer.address;
            e.name = employer.name;

            try
            {
                string filename = String.Concat(DateTime.Now.ToString().Replace(' ', '1').Replace(':', 'u').Replace('-', '8'), employer.imageUrl);
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\Uploads", filename);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    employer.file.CopyTo(stream);
                }
                e.imageUrl = filename;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            _context.Employers.Add(e);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Login", e);
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
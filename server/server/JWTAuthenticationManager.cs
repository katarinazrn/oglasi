using Microsoft.IdentityModel.Tokens;
using server.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    public interface IJWTAuthenticationManager
    {
        string Authenticate(Employer employer);
    }

    public class JWTAuthenticationManager : IJWTAuthenticationManager
    {
        private readonly string tokenKey;

        public JWTAuthenticationManager(string tokenKey)
        {
            this.tokenKey = tokenKey;
        }

        public string Authenticate(Employer employer)
        {
            if (employer == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(tokenKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name,employer.id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

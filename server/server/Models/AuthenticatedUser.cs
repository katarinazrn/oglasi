using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class AuthenticatedUser
    {
        public long id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string imageUrl { get; set; }
        public string PIB { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public string website { get; set; }
        public string phone { get; set; }
        public string fieldOfWork { get; set; }
        public string token { get; set; }
    }
}

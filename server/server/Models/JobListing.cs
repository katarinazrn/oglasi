using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class JobListing
    {
        public long id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime dateCreated { get; set; }
        public DateTime deadline { get; set; }
        public long employerId { get; set; }
        public string location { get; set; }
        public string seniority { get; set; }
        public string tags { get; set; }
        public string fieldOfWork { get; set; }
        public string linkToApply { get; set; }
    }
}

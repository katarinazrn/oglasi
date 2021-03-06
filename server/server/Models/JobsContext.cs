using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class JobsContext: DbContext
    {
        public string DBPath { get; }
        public JobsContext()
        {
            //var folder = Environment.SpecialFolder.LocalApplicationData;
            string folder=Directory.GetCurrentDirectory();
            //var path = Environment.GetFolderPath(folder);
            //DBPath = System.IO.Path.Join(path, "JL.db");
            var path = Directory.GetParent(Directory.GetParent(folder).FullName).FullName;
            DBPath=System.IO.Path.Join(path, "JL.db");
        }

        public DbSet<JobListing> JobListings { get; set; }
        public DbSet<Employer> Employers { get; set;}
        public DbSet<Location> Locations { get; set; }
        public DbSet<FieldOfWork> FieldsOfWork { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder options) 
            => options.UseSqlite("Data Source="+DBPath);

     
    }
}

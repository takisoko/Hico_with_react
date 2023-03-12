using Hico.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Task = Hico.Database.Models.Task;

namespace Hico.Database
{
    public class ApplicationDbContext : DbContext
    {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<TaskMaterialUsage> TaskMaterialUsages { get; set; }
        
    }
}

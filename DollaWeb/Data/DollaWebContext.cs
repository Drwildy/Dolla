using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DollaWeb.Models
{
    public class DollaWebContext : DbContext
    {
        public DollaWebContext (DbContextOptions<DollaWebContext> options)
            : base(options)
        {
        }

        public DbSet<DollaWeb.Models.Envelope> Envelope { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DollaWeb.Models;

namespace DollaWeb.Models
{
    public class DollaWebContext : DbContext
    {
        public DollaWebContext (DbContextOptions<DollaWebContext> options)
            : base(options)
        {
        }

        public DbSet<DollaWeb.Models.Envelope> Envelope { get; set; }
        public DbSet<DollaWeb.Models.PiggyBank> PiggyBank { get; set; }
        public DbSet<DollaWeb.Models.Bill> Bill { get; set; }
        public DbSet<DollaWeb.Models.Moneybox> Moneybox { get; set; }
        public DbSet<DollaWeb.Models.User> User { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Moneybox>()
                    .ToTable("MoneyBox")
                    .HasDiscriminator<int>("MoneyBoxType")
                    .HasValue<Envelope>(1)
                    .HasValue<Bill>(2)
                    .HasValue<PiggyBank>(3);
        }
        public DbSet<DollaWeb.Models.AddPaymentMethod> AddPaymentMethod { get; set; }
    }
    
}

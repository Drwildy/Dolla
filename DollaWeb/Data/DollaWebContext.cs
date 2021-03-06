﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DollaWeb.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace DollaWeb.Models
{
    public class DollaWebContext : IdentityDbContext<ApplicationUser>
    {
        public DollaWebContext (DbContextOptions<DollaWebContext> options) : base(options)
        {

        }

        public DbSet<Envelope> Envelope { get; set; }
        public DbSet<PiggyBank> PiggyBank { get; set; }
        public DbSet<Bill> Bill { get; set; }
        public DbSet<Moneybox> Moneybox { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        public DbSet<PaidBill> PaidBill { get; set; }
        public DbSet<Salary> Salaries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Moneybox>()
                    .ToTable("MoneyBox")
                    .HasDiscriminator<int>("MoneyBoxType")
                    .HasValue<Envelope>(1)
                    .HasValue<Bill>(2)
                    .HasValue<PiggyBank>(3);


            
;        }
        public DbSet<DollaWeb.Models.AddPaymentMethod> AddPaymentMethod { get; set; }
    }
    
}

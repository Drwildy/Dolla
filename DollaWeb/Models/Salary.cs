using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DollaWeb.Models
{
    public class Salary
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ApplicationUser")]
        public string ApplicationUser { get; set; }
        public bool IsSalary { get; set; } //if false, then is hourly
        public double SalaryAmount { get; set; }

    }
}

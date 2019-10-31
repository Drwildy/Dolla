
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DollaWeb.Models
{
    public class ApplicationUser : IdentityUser
    {
        //[Required]
        public ICollection<Moneybox> moneyBoxID { get; set; }
        public Salary SalarySettings { get; set; }
    }
}
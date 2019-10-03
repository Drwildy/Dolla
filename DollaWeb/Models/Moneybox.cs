using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DollaWeb.Models
{
    public abstract class Moneybox
    {
        [Key]
        public int Id { get; set; }
        
        
        public int MoneyBoxType { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Icon { get; set; }
        [ForeignKey("User")]
        public string Username { get; set; }

    }
}

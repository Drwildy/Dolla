using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DollaWeb.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string Username {get; set;}
        public string Type { get; set; } //Withdraw, Depostin, Trnasfer
        [ForeignKey("Moneybox")]
        public int? TransferFromId { get; set; }
        [ForeignKey("Moneybox")]
        public int? TransferToId { get; set; }
        
        public double TransferAmount { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}

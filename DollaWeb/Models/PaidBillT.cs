using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DollaWeb.Models
{
    public class PaidBillT
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Bill")]
        public int? BillId { get; set; }
        [ForeignKey("Transaction")]
        public int? TransactionId { get; set; }
        public string Month { get; set; }
        public string ApplicationUserID { get; set; }
        public double TransferAmount { get; set; }
        public virtual Transaction Transaction { get; set; } //This is needed to recongize the ForeignKey in the migration
        public virtual Bill Bill { get; set; } //This is needed to recongize the ForeignKey in the migration
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DollaWeb.Models
{
    public class AddPaymentMethod
    {

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public DateTime CreatedDate { get; set; }
        [ForeignKey("ApplicationUser")]
        public string ApplicationUserId { get; set; }





    }
}


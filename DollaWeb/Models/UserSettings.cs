using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DollaWeb.Models
{
    public class UserSettings
    {
        public int Id { get; set; }
        public int HoursTilWarning { get; set; }
        public string User { get; set; }
        public ICollection<Moneybox> moneyBoxID { get; set; }
    }
}
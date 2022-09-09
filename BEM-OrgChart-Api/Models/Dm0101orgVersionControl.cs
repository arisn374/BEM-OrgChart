using System;
using System.Collections.Generic;

namespace BEM_OrgChart_Api.Models
{
    public partial class Dm0101orgVersionControl
    {
        /// <summary>
        /// Format: &lt;AreaCode&gt;-&lt;Year&gt;-&lt;Runno&gt;
        /// </summary>
        public string OrgCode { get; set; } = null!;
        public string? OrgName { get; set; }
        public DateTime? OrgBeginDate { get; set; }
        public DateTime? OrgEndDate { get; set; }
        public bool Locked { get; set; }
        public DateTime DtmCreated { get; set; }
        public DateTime? DtmModified { get; set; }
    }
}

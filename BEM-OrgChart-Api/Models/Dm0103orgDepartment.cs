using System;
using System.Collections.Generic;

namespace BEM_OrgChart_Api.Models
{
    public partial class Dm0103orgDepartment
    {
        public string OrgCode { get; set; } = null!;
        public int? BranchId { get; set; }
        public string NodeCode { get; set; } = null!;
        public int? NodeLevel { get; set; }
        public string? NodeName { get; set; }
        public string? NodeNameEn { get; set; }
        public string? NodeNameAbb { get; set; }
        public string? NodeParent { get; set; }
        public string? DeptCode { get; set; }
        public string? CostCenter { get; set; }
        public string? Remark { get; set; }
        public bool Locked { get; set; }
        public DateTime DtmCreated { get; set; }
        public DateTime? DtmModified { get; set; }
    }
}

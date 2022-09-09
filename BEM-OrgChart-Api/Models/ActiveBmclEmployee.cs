using System;
using System.Collections.Generic;

namespace BEM_OrgChart_Api.Models
{
    public partial class ActiveBmclEmployee
    {
        public string? EmCode { get; set; }
        public string? EmTitle { get; set; }
        public string? EmTname { get; set; }
        public string? EmTsurname { get; set; }
        public string? EmEtitle { get; set; }
        public string? EmEname { get; set; }
        public string? EmEsurname { get; set; }
        public string? EmNickname { get; set; }
        public string? EmIdcard { get; set; }
        public DateTime? EmBirthdate { get; set; }
        public string? EmSex { get; set; }
        public string? EmPosition { get; set; }
        public string? EmEposition { get; set; }
        public DateTime? EmEmploydate { get; set; }
        public string? EmDept { get; set; }
        public string? EmDeptName { get; set; }
        public string? EmDeptEname { get; set; }
        public string? EmLocation { get; set; }
    }
}

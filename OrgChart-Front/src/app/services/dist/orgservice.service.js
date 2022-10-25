"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var OrgService = /** @class */ (function () {
    function OrgService(http) {
        this.http = http;
    }
    //   select 
    // NodeCode
    // ,NodeParent
    // ,NodeName
    // ,ISNULL(NodeNameEn,'-') as NodeNameEn
    // ,ISNULL(NodeNameAbb,'-') as NodeNameAbb
    // ,DeptCode 
    // ,ISNULL(c,0) as countEmp
    // from BEMTree.dbo.DM0103OrgDepartment as dept
    // left join (select EM_DEPT,COUNT(EM_DEPT) as c
    // from BEMTree.dbo.[Active BMCL Employee]
    // group by EM_DEPT) as emp on dept.DeptCode = emp.EM_DEPT
    // where 
    // OrgCode = (select OrgCode from BEMTree.dbo.DM0101OrgVersionControl where Locked = 0 ) 
    // and Locked  = 0 
    // order by NodeCode
    //    --for json auto,INCLUDE_NULL_VALUES
    OrgService.prototype.getOrgDepartment = function () {
        return this.http.get("https://192.168.2.211/orgchart_api/department");
    };
    OrgService.prototype.getEmployee = function () {
        return this.http.get("https://192.168.2.211/orgchart_api/employee");
    };
    OrgService.prototype.getEmployeeOrg = function () {
        return this.http.get("https://192.168.2.211/orgchart_api/employeeOrg");
    };
    OrgService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrgService);
    return OrgService;
}());
exports.OrgService = OrgService;

//# sourceMappingURL=orgservice.service.js.map

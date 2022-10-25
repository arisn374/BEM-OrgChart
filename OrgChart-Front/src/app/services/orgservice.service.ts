import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(private http: HttpClient) { }

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
  getOrgDepartment() {
     return this.http.get("https://192.168.2.211/orgchart_api/department");
  }
  getEmployee() {
    return this.http.get("https://192.168.2.211/orgchart_api/employee");
  }
  getEmployeeOrg() {
   return this.http.get("https://192.168.2.211/orgchart_api/employeeOrg");
  }

}

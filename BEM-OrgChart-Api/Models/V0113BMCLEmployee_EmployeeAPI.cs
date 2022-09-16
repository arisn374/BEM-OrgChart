
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BEM_OrgChart_Api.Models
{
    public partial class  V0113BMCLEmployee_EmployeeAPI
    {
      public string?  EM_CODE                 {get;set;}
      public string?  thName               {get;set;}
      public string?  engName              {get;set;}
      public string?  EM_NICKNAME          {get;set;}
      public string?  DeptCode             {get;set;}
      public string?  NodeCode                {get;set;}
      public string?  PositionOrder           {get;set;}
      public string?  NodeName             {get;set;}
      public string?  NodeNameEn           {get;set;}
      public string?  NodeNameAbb          {get;set;}
      public string?  PositionName         {get;set;}
      public string?  PositionNameEn       {get;set;}
      public string?  TelPrimary           {get;set;}
      public string?  TelSecondary         {get;set;}
    }
}

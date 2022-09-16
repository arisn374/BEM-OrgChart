using System.Text.RegularExpressions;
using BEM_OrgChart_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("http://localhost:4200"
            , "https://localhost:7165"
            , "https://inhouse.bemplc.co.th"
            , "https://app.bemplc.co.th"
            , "https://orgchart.bemplc.co.th"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});
builder.Services.AddDbContext<BEMTreeContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("AppDb")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/department", async (BEMTreeContext db) =>
{
    var orgActive = await db.Dm0101orgVersionControls.Where(x => !x.Locked).Select(s => s.OrgCode).SingleOrDefaultAsync();
    var countDeptCode = db.ActiveBmclEmployees
    .GroupBy(g => g.EmDept)
    .Select(s => new
    {
        DeptCode = s.Key,
        Count = s.Count()
    });

    var data = await db.Dm0103orgDepartments
    .GroupJoin(countDeptCode,
    dep => dep.DeptCode,
    emp => emp.DeptCode,
    (dep, emp) => new { Dept = dep, Emp = emp })
    .SelectMany(x => x.Emp.DefaultIfEmpty(),
    (x, y) => new {
        x.Dept,
        Count = y.Count != null ? y.Count : 0
    })
    .Where(s => !s.Dept.Locked && s.Dept.OrgCode == orgActive)
    .Select(s => new
    {
        s.Dept.NodeCode,
        s.Dept.NodeParent,
        s.Dept.NodeName,
        s.Dept.NodeNameEn,
        s.Dept.NodeNameAbb,
        s.Dept.DeptCode,
        s.Count
    })
    .OrderBy(o => o.NodeCode)
    .ToListAsync();
    return Results.Ok(data);
});


app.MapGet("/employee", async (BEMTreeContext db) =>
{
    var data = await db.ActiveBmclEmployees
    .Select(s => new
    {
        ID = s.EmCode,
        ThaiName = s.EmTitle + s.EmTname + " " + s.EmTsurname,
        EngName = s.EmEtitle + s.EmEname + " " + s.EmEsurname,
        Nickname = s.EmNickname,
        EM_POSITION = s.EmPosition,
        EM_EPOSITION = s.EmEposition,
        EM_DEPT = s.EmDept
    })
    .ToListAsync();
    return Results.Ok(data);
});

app.MapGet("/employeeOrg", async (BEMTreeContext db) =>
{
    var orgActive = await db.Dm0101orgVersionControls.Where(x => !x.Locked).Select(s => s.OrgCode).SingleOrDefaultAsync();
    var data = await db.V0113BMCLEmployee_EmployeeAPIs
    .Select(s => new
    {
        EM_CODE         =   s.EM_CODE         
        ,thName          =   s.thName          
        ,engName         =   s.engName         
        ,EM_NICKNAME     =   s.EM_NICKNAME     
        ,DeptCode        =   s.DeptCode        
        ,NodeCode        =   s.NodeCode        
        ,PositionOrder   =   s.PositionOrder   
        ,NodeName        =   s.NodeName        
        ,NodeNameEn      =   s.NodeNameEn      
        ,NodeNameAbb     =   s.NodeNameAbb     
        ,PositionName    =   s.PositionName    
        ,PositionNameEn  =   s.PositionNameEn  
        ,TelPrimary      =   s.TelPrimary      
        ,TelSecondary    =   s.TelSecondary    
 })
    .ToListAsync();
    return Results.Ok(data);
});

app.Run();
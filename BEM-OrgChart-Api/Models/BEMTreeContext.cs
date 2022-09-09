using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BEM_OrgChart_Api.Models
{
    public partial class BEMTreeContext : DbContext
    {
        public BEMTreeContext()
        {
        }

        public BEMTreeContext(DbContextOptions<BEMTreeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ActiveBmclEmployee> ActiveBmclEmployees { get; set; } = null!;
        public virtual DbSet<Dm0101orgVersionControl> Dm0101orgVersionControls { get; set; } = null!;
        public virtual DbSet<Dm0103orgDepartment> Dm0103orgDepartments { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=172.15.1.94\\mssql2014;Database=BEMTree;User Id=sa;Password=luckytime;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("Thai_CI_AS");

            modelBuilder.Entity<ActiveBmclEmployee>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Active BMCL Employee");

                entity.Property(e => e.EmBirthdate)
                    .HasColumnType("datetime")
                    .HasColumnName("EM_BIRTHDATE");

                entity.Property(e => e.EmCode)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("EM_CODE");

                entity.Property(e => e.EmDept)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("EM_DEPT");

                entity.Property(e => e.EmDeptEname)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("EM_DeptEName");

                entity.Property(e => e.EmDeptName)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("EM_DeptName");

                entity.Property(e => e.EmEmploydate)
                    .HasColumnType("datetime")
                    .HasColumnName("EM_EMPLOYDATE");

                entity.Property(e => e.EmEname)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("EM_ENAME");

                entity.Property(e => e.EmEposition)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("EM_EPOSITION");

                entity.Property(e => e.EmEsurname)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("EM_ESURNAME");

                entity.Property(e => e.EmEtitle)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("EM_ETITLE");

                entity.Property(e => e.EmIdcard)
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .HasColumnName("EM_IDCARD");

                entity.Property(e => e.EmLocation)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("EM_LOCATION");

                entity.Property(e => e.EmNickname)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("EM_NICKNAME");

                entity.Property(e => e.EmPosition)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("EM_POSITION");

                entity.Property(e => e.EmSex)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("EM_SEX");

                entity.Property(e => e.EmTitle)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("EM_TITLE");

                entity.Property(e => e.EmTname)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("EM_TNAME");

                entity.Property(e => e.EmTsurname)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("EM_TSURNAME");
            });

            modelBuilder.Entity<Dm0101orgVersionControl>(entity =>
            {
                entity.HasKey(e => e.OrgCode)
                    .HasName("PK_DM0104OrgVersionControl_1");

                entity.ToTable("DM0101OrgVersionControl");

                entity.Property(e => e.OrgCode)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasComment("Format: <AreaCode>-<Year>-<Runno>");

                entity.Property(e => e.DtmCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("dtmCreated")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DtmModified)
                    .HasColumnType("datetime")
                    .HasColumnName("dtmModified");

                entity.Property(e => e.OrgBeginDate).HasColumnType("date");

                entity.Property(e => e.OrgEndDate).HasColumnType("date");

                entity.Property(e => e.OrgName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Dm0103orgDepartment>(entity =>
            {
                entity.HasKey(e => new { e.OrgCode, e.NodeCode });

                entity.ToTable("DM0103OrgDepartment");

                entity.Property(e => e.OrgCode)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.NodeCode)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.BranchId).HasColumnName("BranchID");

                entity.Property(e => e.CostCenter)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.DeptCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DtmCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("dtmCreated")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DtmModified)
                    .HasColumnType("datetime")
                    .HasColumnName("dtmModified");

                entity.Property(e => e.NodeName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.NodeNameAbb)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NodeNameEn)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.NodeParent)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

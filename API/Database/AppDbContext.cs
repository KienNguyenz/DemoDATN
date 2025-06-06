﻿using DemoGym.Dtos;
using DemoGym.Entities;
using DemoGym.Entities.Common;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Demo.Database
   
{
    public class AppDbContext : IdentityDbContext<ApplicationUsers>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        #region
        public DbSet<Branch> branches { get; set; }
        public DbSet<Employee> employees { get; set; }
        public DbSet<Member> members { get; set; }
        public DbSet<Package> packages { get; set; }
        public DbSet<Room> rooms { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        public DbSet<PTMember> PTMembers { get; set; }
        public DbSet<EmployeeMonthlySalary> EmployeeMonthlySalaries { get; set; }
        public DbSet<Devices> Devices { get; set; }
        public DbSet<RevenueLog> RevenueLogs { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // --- Cấu hình bảng Member ---
            modelBuilder.Entity<Member>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.FirstName);
                entity.Property(e => e.LastName);
                entity.Property(e => e.Email);
                entity.Property(e => e.Birthday);
                entity.Property(e => e.Gender);
                entity.Property(e => e.Address);
                entity.Property(e => e.PhoneNumber);

                entity
            .HasOne(e => e.Branch)
            .WithMany(b => b.Members)
            .HasForeignKey(e => e.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

                
                entity
                .HasOne(e => e.Package)
                .WithMany(p => p.Members)
                .HasForeignKey(e => e.PackageId)
                .OnDelete(DeleteBehavior.Restrict);

                // One-to-One với PTMember
                entity
                    .HasOne<PTMember>()
                    .WithOne(pm => pm.Member)
                    .HasForeignKey<PTMember>(pm => pm.MemberId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // --- Cấu hình bảng Employee ---
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasMany(e => e.PTMembers) // Một PT có thể hướng dẫn nhiều Member
                    .WithOne(pm => pm.Employee)
                    .HasForeignKey(pm => pm.EmployeeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // --- Cấu hình bảng PTMember ---
            modelBuilder.Entity<PTMember>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Member)
                    .WithOne(pm => pm.PTMember)
                    .HasForeignKey<PTMember>(pm => pm.MemberId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Employee)
                    .WithMany(e => e.PTMembers) // Một PT có thể có nhiều Member
                    .HasForeignKey(e => e.EmployeeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }

    }
}

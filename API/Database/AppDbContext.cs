using DemoGym.Dtos;
using DemoGym.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SMG.Entities;

namespace Demo.Database
   
{
    public class AppDbContext : IdentityDbContext<ApplicationUsers>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        #region
        public DbSet<Branch> branches { get; set; }
        public DbSet<Device> devices { get; set; }
        public DbSet<Employee> employees { get; set; }
        public DbSet<Member> members { get; set; }
        public DbSet<Package> packages { get; set; }
        public DbSet<Room> rooms { get; set; }
        public DbSet<DevicesList> devicesLists { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        public DbSet<PTMember> PTMembers { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // --- Cấu hình bảng Member ---
            modelBuilder.Entity<Member>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.MemName);
                entity.Property(e => e.Birthday);
                entity.Property(e => e.Gender);
                entity.Property(e => e.Address);
                entity.Property(e => e.PhoneNumber);

                entity.HasOne(e => e.Package)
                    .WithOne(p => p.Member)
                    .HasForeignKey<Member>(m => m.PackageId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Một Member chỉ có 1 PT (One-to-Many)
                entity.HasOne<PTMember>()
                    .WithOne(pm => pm.Member)
                    .HasForeignKey<PTMember>(pm => pm.MemberId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // --- Cấu hình bảng DevicesList ---
            modelBuilder.Entity<DevicesList>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.DeviceName);
                entity.Property(e => e.Quantity);
                entity.Property(e => e.Origin);

                entity.HasOne(e => e.Device)
                    .WithOne(p => p.DevicesList)
                    .HasForeignKey<DevicesList>(m => m.DeviceId)
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

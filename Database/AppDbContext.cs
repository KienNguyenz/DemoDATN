using DemoGym.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SMG.Entities;

namespace Demo.Database
   
{
    public class AppDbContext : DbContext
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
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
            });

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
        }
    }
}

using Microsoft.EntityFrameworkCore;
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
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


        }
    }
}

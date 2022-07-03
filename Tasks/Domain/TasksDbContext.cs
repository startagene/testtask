using Microsoft.EntityFrameworkCore;

namespace Tasks.Domain
{
    public class TasksDbContext : DbContext
    {
        public DbSet<EmailRecord> EmailRecords { get; set; }
        public TasksDbContext(DbContextOptions<TasksDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<EmailRecord>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }

}

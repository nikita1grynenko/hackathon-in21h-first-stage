using HtmlRunnersFirstStage.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Infrastructure.Context
{
    public class AppDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public DbSet<Quest> Quests { get; set; } = null!;
        public DbSet<QuestTask> QuestTasks { get; set; } = null!;
        public DbSet<TaskOption> TaskOptions { get; set; } = null!;
        public DbSet<TaskMedia> QuestTaskMedias { get; set; } = null!;
        public DbSet<Feedback> Feedbacks { get; set; } = null!;
        public DbSet<QuestAttempt> QuestAttempts { get; set; } = null!;

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.QuestsCreated)
                .WithOne(q => q.CreatedByUser)
                .HasForeignKey(q => q.CreatedByUserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.QuestAttempts)
                .WithOne(qa => qa.User)
                .HasForeignKey(qa => qa.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.Feedbacks)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<Quest>()
                .HasMany(q => q.QuestTasks)
                .WithOne(t => t.Quest)
                .HasForeignKey(t => t.QuestId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<Quest>()
                .HasMany(q => q.Feedbacks)
                .WithOne(f => f.Quest)
                .HasForeignKey(f => f.QuestId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<QuestTask>()
                .HasMany(t => t.Options)
                .WithOne(o => o.Task)
                .HasForeignKey(o => o.TaskId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<QuestTask>()
                .HasMany(t => t.Media)
                .WithOne(m => m.Task)
                .HasForeignKey(m => m.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Feedback>()
                .HasIndex(f => new { f.UserId, f.QuestId })
                .IsUnique();
        }
    }
}

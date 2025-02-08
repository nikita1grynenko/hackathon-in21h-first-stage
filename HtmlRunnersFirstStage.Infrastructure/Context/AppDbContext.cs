using System.Text.Json;
using HtmlRunnersFirstStage.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Infrastructure.Context;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Quest> Quests { get; set; }
    public DbSet<QuestAttempt> QuestAttempts { get; set; }
    public DbSet<QuestTask> QuestTasks { get; set; }
    public DbSet<TaskType> TaskTypes { get; set; }
    public DbSet<UserAnswerOption> UserAnswerOptions { get; set; }
    public DbSet<UserQuestTaskAnswer> UserQuestTaskAnswers { get; set; }
    public DbSet<AnswerOption> AnswerOptions { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Конфігурація User
        modelBuilder.Entity<User>()
            .HasMany(u => u.CreatedQuests)
            .WithOne(q => q.Author)
            .HasForeignKey(q => q.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasMany(u => u.QuestAttempts)
            .WithOne(qa => qa.User)
            .HasForeignKey(qa => qa.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Feedbacks)
            .WithOne(f => f.User)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Конфігурація Quest
        modelBuilder.Entity<Quest>()
            .Property(q => q.TimeLimitMinutes)
            .HasConversion(
                v => v.TotalMinutes,
                v => TimeSpan.FromMinutes(v)
            );

        modelBuilder.Entity<Quest>()
            .HasMany(q => q.Tasks)
            .WithOne(t => t.Quest)
            .HasForeignKey(t => t.QuestId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Quest>()
            .HasMany(q => q.Feedbacks)
            .WithOne(f => f.Quest)
            .HasForeignKey(f => f.QuestId)
            .OnDelete(DeleteBehavior.Cascade);

        // Конфігурація QuestAttempt
        modelBuilder.Entity<QuestAttempt>()
            .HasOne(qa => qa.Quest)
            .WithMany()
            .HasForeignKey(qa => qa.QuestId)
            .OnDelete(DeleteBehavior.Restrict);

        // Конфігурація QuestTask
        modelBuilder.Entity<QuestTask>()
            .HasOne(t => t.TaskType)
            .WithMany(tt => tt.QuestTasks)
            .HasForeignKey(t => t.TaskTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<QuestTask>()
            .HasMany(t => t.AnswerOptions)
            .WithOne(ao => ao.QuestTask)
            .HasForeignKey(ao => ao.TaskId)
            .OnDelete(DeleteBehavior.Cascade);

        // Конфігурація UserQuestTaskAnswer
        modelBuilder.Entity<UserQuestTaskAnswer>()
            .HasOne(ua => ua.QuestAttempt)
            .WithMany(qa => qa.UserQuestTaskAnswers)
            .HasForeignKey(ua => ua.QuestAttemptId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserQuestTaskAnswer>()
            .HasOne(ua => ua.Task)
            .WithMany()
            .HasForeignKey(ua => ua.TaskId)
            .OnDelete(DeleteBehavior.Restrict);

        // Конфігурація AnswerOption
        modelBuilder.Entity<AnswerOption>()
            .HasOne(ao => ao.QuestTask)
            .WithMany(t => t.AnswerOptions)
            .HasForeignKey(ao => ao.TaskId)
            .OnDelete(DeleteBehavior.Cascade);

        // Конфігурація UserAnswerOption
        modelBuilder.Entity<UserAnswerOption>()
            .HasKey(uo => new { uo.UserAnswerId, uo.AnswerOptionId });

        modelBuilder.Entity<UserAnswerOption>()
            .HasOne(uo => uo.UserAnswer)
            .WithMany(ua => ua.SelectedOptions)
            .HasForeignKey(uo => uo.UserAnswerId);

        modelBuilder.Entity<UserAnswerOption>()
            .HasOne(uo => uo.AnswerOption)
            .WithMany()
            .HasForeignKey(uo => uo.AnswerOptionId);

        // Конфігурація Feedback
        modelBuilder.Entity<Feedback>()
            .HasIndex(f => new { f.UserId, f.QuestId })
            .IsUnique();
    }
}
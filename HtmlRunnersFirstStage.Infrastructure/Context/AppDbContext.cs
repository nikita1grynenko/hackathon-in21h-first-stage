﻿using System.Text.Json;
using HtmlRunnersFirstStage.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Infrastructure.Context;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Quest> Quests { get; set; } = null!;
    public DbSet<QuestTask> QuestTasks { get; set; } = null!;
    public DbSet<TaskOption> TaskOptions { get; set; } = null!;
    public DbSet<TaskMedia> QuestTaskMedias { get; set; } = null!;
    public DbSet<Feedback> Feedbacks { get; set; } = null!;
    public DbSet<QuestAttempt> QuestAttempts { get; set; } = null!;
    public DbSet<AttemptedTask> AttemptedTasks { get; set; } = null!;
    public DbSet<AttemptedTaskOption> AttemptedTaskOptions { get; set; } = null!;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

     protected override void OnModelCreating(ModelBuilder modelBuilder)
     {
            base.OnModelCreating(modelBuilder);

            // --- Конфігурація для User ---
            // User створює квести – Cascade (видалення користувача видалить і його квести)
            modelBuilder.Entity<User>()
                .HasMany(u => u.QuestsCreated)
                .WithOne(q => q.CreatedByUser)
                .HasForeignKey(q => q.CreatedByUserId)
                .OnDelete(DeleteBehavior.Cascade);

            // User має спроби проходження – Restrict (щоб уникнути другого каскадного шляху до QuestAttempts)
            modelBuilder.Entity<User>()
                .HasMany(u => u.QuestAttempts)
                .WithOne(qa => qa.User)
                .HasForeignKey(qa => qa.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // User має відгуки – Restrict (щоб уникнути додаткового каскаду)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Feedbacks)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Квест має завдання – Cascade (видалення квесту видаляє завдання)
            modelBuilder.Entity<Quest>()
                .HasMany(q => q.QuestTasks)
                .WithOne(t => t.Quest)
                .HasForeignKey(t => t.QuestId)
                .OnDelete(DeleteBehavior.Cascade);

            // Квест має відгуки – Cascade (видалення квесту видаляє і його відгуки)
            modelBuilder.Entity<Quest>()
                .HasMany(q => q.Feedbacks)
                .WithOne(f => f.Quest)
                .HasForeignKey(f => f.QuestId)
                .OnDelete(DeleteBehavior.Cascade);

            // Квест має спроби проходження – Cascade (основний каскадний шлях до QuestAttempts)
            modelBuilder.Entity<Quest>()
                .HasMany(q => q.QuestAttempts)
                .WithOne(qa => qa.Quest)
                .HasForeignKey(qa => qa.QuestId)
                .OnDelete(DeleteBehavior.Cascade);
            

            // Завдання має варіанти відповідей – Cascade
            modelBuilder.Entity<QuestTask>()
                .HasMany(t => t.Options)
                .WithOne(o => o.Task)
                .HasForeignKey(o => o.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            // Завдання має медіа – Cascade
            modelBuilder.Entity<QuestTask>()
                .HasMany(t => t.Media)
                .WithOne(m => m.Task)
                .HasForeignKey(m => m.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            // --- Конфігурація для AttemptedTask (раніше UserQuestTaskAnswer) ---
            // Спроба проходження квесту містить результати завдань – Cascade
            modelBuilder.Entity<AttemptedTask>()
                .HasOne(at => at.QuestAttempt)
                .WithMany(qa => qa.AttemptedTasks)
                .HasForeignKey(at => at.QuestAttemptId)
                .OnDelete(DeleteBehavior.Cascade);

            // Спроба відповіді на завдання пов’язана із завданням – Restrict
            modelBuilder.Entity<AttemptedTask>()
                .HasOne(at => at.Task)
                .WithMany() // Якщо в QuestTask немає навігаційної властивості до AttemptedTasks
                .HasForeignKey(at => at.TaskId)
                .OnDelete(DeleteBehavior.Restrict);

            // --- Конфігурація для AttemptedTaskOption (раніше UserAnswerOption) ---
            modelBuilder.Entity<AttemptedTaskOption>()
                .HasKey(ato => new { ato.AttemptedTaskId, ato.TaskOptionId });

            modelBuilder.Entity<AttemptedTaskOption>()
                .HasOne(ato => ato.AttemptedTask)
                .WithMany(at => at.AttemptedTaskOptions)
                .HasForeignKey(ato => ato.AttemptedTaskId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AttemptedTaskOption>()
                .HasOne(ato => ato.TaskOption)
                .WithMany()
                .HasForeignKey(ato => ato.TaskOptionId)
                .OnDelete(DeleteBehavior.Restrict);

            // --- Конфігурація для Feedback ---
            modelBuilder.Entity<Feedback>()
                .HasIndex(f => new { f.UserId, f.QuestId })
                .IsUnique();
     }
 }
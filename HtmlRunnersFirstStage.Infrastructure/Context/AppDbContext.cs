using System.Text.Json;
using HtmlRunnersFirstStage.Domain.Entites;
using Microsoft.EntityFrameworkCore;

namespace HtmlRunnersFirstStage.Infrastructure.Context;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Quest> Quests { get; set; }
    public DbSet<PickedQuest> PickedQuests { get; set; }
    public DbSet<TaskBase> Tasks { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Налаштування для TPH: використання Discriminator
        modelBuilder.Entity<Task>()
            .HasDiscriminator<string>("TaskType")
            .HasValue<OpenQuestionTask>("OpenQuestion")
            .HasValue<MultipleChoiceTask>("MultipleChoice")
            .HasValue<OneChoiceTask>("OneChoice");

        // Серіалізація списків для MultipleChoiceTask
        modelBuilder.Entity<MultipleChoiceTask>()
            .Property(e => e.Options)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null)
            );

        modelBuilder.Entity<MultipleChoiceTask>()
            .Property(e => e.CorrectOptions)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null)
            );

        // Серіалізація списків для OneChoiceTask
        modelBuilder.Entity<OneChoiceTask>()
            .Property(e => e.Options)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null)
            );

        base.OnModelCreating(modelBuilder);
    }

}
﻿// <auto-generated />
using System;
using HtmlRunnersFirstStage.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HtmlRunnersFirstStage.Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.AnswerOption", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<string>("OptionText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.ToTable("AnswerOptions");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.Feedback", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("QuestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("RatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("QuestId");

                    b.HasIndex("UserId", "QuestId")
                        .IsUnique();

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.Quest", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AuthorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("TimeLimitMinutes")
                        .HasColumnType("float");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Quests");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestAttempt", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("bit");

                    b.Property<Guid>("QuestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Score")
                        .HasColumnType("float");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("QuestId");

                    b.HasIndex("UserId");

                    b.ToTable("QuestAttempts");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MediaUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("QuestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("TaskTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuestId");

                    b.HasIndex("TaskTypeId");

                    b.ToTable("QuestTasks");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.TaskType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TaskTypes");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.UserAnswerOption", b =>
                {
                    b.Property<Guid>("UserAnswerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AnswerOptionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("UserAnswerId", "AnswerOptionId");

                    b.HasIndex("AnswerOptionId");

                    b.ToTable("UserAnswerOptions");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.UserQuestTaskAnswer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AnswerText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<Guid>("QuestAttemptId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("QuestAttemptId");

                    b.HasIndex("TaskId");

                    b.ToTable("UserQuestTaskAnswers");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.AnswerOption", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.QuestTask", "QuestTask")
                        .WithMany("AnswerOptions")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuestTask");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.Feedback", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.Quest", "Quest")
                        .WithMany("Feedbacks")
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.User", "User")
                        .WithMany("Feedbacks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Quest");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.Quest", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.User", "Author")
                        .WithMany("CreatedQuests")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestAttempt", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.Quest", "Quest")
                        .WithMany()
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.User", "User")
                        .WithMany("QuestAttempts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Quest");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestTask", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.Quest", "Quest")
                        .WithMany("Tasks")
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.TaskType", "TaskType")
                        .WithMany("QuestTasks")
                        .HasForeignKey("TaskTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Quest");

                    b.Navigation("TaskType");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.UserAnswerOption", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.AnswerOption", "AnswerOption")
                        .WithMany()
                        .HasForeignKey("AnswerOptionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.UserQuestTaskAnswer", "UserAnswer")
                        .WithMany("SelectedOptions")
                        .HasForeignKey("UserAnswerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AnswerOption");

                    b.Navigation("UserAnswer");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.UserQuestTaskAnswer", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.QuestAttempt", "QuestAttempt")
                        .WithMany("UserQuestTaskAnswers")
                        .HasForeignKey("QuestAttemptId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.QuestTask", "Task")
                        .WithMany()
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("QuestAttempt");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.Quest", b =>
                {
                    b.Navigation("Feedbacks");

                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestAttempt", b =>
                {
                    b.Navigation("UserQuestTaskAnswers");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestTask", b =>
                {
                    b.Navigation("AnswerOptions");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.TaskType", b =>
                {
                    b.Navigation("QuestTasks");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.User", b =>
                {
                    b.Navigation("CreatedQuests");

                    b.Navigation("Feedbacks");

                    b.Navigation("QuestAttempts");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.UserQuestTaskAnswer", b =>
                {
                    b.Navigation("SelectedOptions");
                });
#pragma warning restore 612, 618
        }
    }
}

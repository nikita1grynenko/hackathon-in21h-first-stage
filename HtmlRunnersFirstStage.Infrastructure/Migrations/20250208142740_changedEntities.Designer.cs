﻿// <auto-generated />
using System;
using HtmlRunnersFirstStage.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HtmlRunnersFirstStage.Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250208142740_changedEntities")]
    partial class changedEntities
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.AttemptedTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("AttemptedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<Guid>("QuestAttemptId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("UserAnswer")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuestAttemptId");

                    b.HasIndex("TaskId");

                    b.ToTable("AttemptedTasks");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.AttemptedTaskOption", b =>
                {
                    b.Property<Guid>("AttemptedTaskId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TaskOptionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("AttemptedTaskId", "TaskOptionId");

                    b.HasIndex("TaskOptionId");

                    b.ToTable("AttemptedTaskOptions");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.Feedback", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Comment")
                        .HasMaxLength(2000)
                        .HasColumnType("nvarchar(2000)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("QuestId")
                        .HasColumnType("uniqueidentifier");

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

                    b.Property<Guid>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan?>("GlobalTimeLimit")
                        .HasColumnType("time");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedByUserId");

                    b.ToTable("Quests");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestAttempt", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CompletedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("QuestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("StartedAt")
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

                    b.Property<string>("CorrectAnswer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("QuestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("QuestionType")
                        .HasColumnType("int");

                    b.Property<TimeSpan?>("TimeLimit")
                        .HasColumnType("time");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.HasIndex("QuestId");

                    b.ToTable("QuestTasks");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.TaskMedia", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("MediaType")
                        .HasColumnType("int");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.ToTable("QuestTaskMedias");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.TaskOption", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.ToTable("TaskOptions");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.AttemptedTask", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.QuestAttempt", "QuestAttempt")
                        .WithMany("AttemptedTasks")
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

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.AttemptedTaskOption", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.AttemptedTask", "AttemptedTask")
                        .WithMany("AttemptedTaskOptions")
                        .HasForeignKey("AttemptedTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.TaskOption", "TaskOption")
                        .WithMany()
                        .HasForeignKey("TaskOptionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("AttemptedTask");

                    b.Navigation("TaskOption");
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
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.User", "CreatedByUser")
                        .WithMany("QuestsCreated")
                        .HasForeignKey("CreatedByUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedByUser");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestAttempt", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.Quest", "Quest")
                        .WithMany("QuestAttempts")
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Cascade)
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
                        .WithMany("QuestTasks")
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Quest");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.TaskMedia", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.QuestTask", "Task")
                        .WithMany("Media")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.TaskOption", b =>
                {
                    b.HasOne("HtmlRunnersFirstStage.Domain.Entities.QuestTask", "Task")
                        .WithMany("Options")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.AttemptedTask", b =>
                {
                    b.Navigation("AttemptedTaskOptions");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.Quest", b =>
                {
                    b.Navigation("Feedbacks");

                    b.Navigation("QuestAttempts");

                    b.Navigation("QuestTasks");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestAttempt", b =>
                {
                    b.Navigation("AttemptedTasks");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.QuestTask", b =>
                {
                    b.Navigation("Media");

                    b.Navigation("Options");
                });

            modelBuilder.Entity("HtmlRunnersFirstStage.Domain.Entities.User", b =>
                {
                    b.Navigation("Feedbacks");

                    b.Navigation("QuestAttempts");

                    b.Navigation("QuestsCreated");
                });
#pragma warning restore 612, 618
        }
    }
}

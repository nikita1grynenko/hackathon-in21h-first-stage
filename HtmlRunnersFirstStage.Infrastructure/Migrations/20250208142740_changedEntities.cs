using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HtmlRunnersFirstStage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changedEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestAttempts_Quests_QuestId",
                table: "QuestAttempts");

            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Users_AuthorId",
                table: "Quests");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestTasks_TaskTypes_TaskTypeId",
                table: "QuestTasks");

            migrationBuilder.DropTable(
                name: "TaskTypes");

            migrationBuilder.DropTable(
                name: "UserAnswerOptions");

            migrationBuilder.DropTable(
                name: "AnswerOptions");

            migrationBuilder.DropTable(
                name: "UserQuestTaskAnswers");

            migrationBuilder.DropIndex(
                name: "IX_QuestTasks_TaskTypeId",
                table: "QuestTasks");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "TimeLimitMinutes",
                table: "Quests");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "QuestAttempts");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "QuestAttempts");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "TaskTypeId",
                table: "QuestTasks",
                newName: "QuestionType");

            migrationBuilder.RenameColumn(
                name: "MediaUrl",
                table: "QuestTasks",
                newName: "CorrectAnswer");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Quests",
                newName: "CreatedByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Quests_AuthorId",
                table: "Quests",
                newName: "IX_Quests_CreatedByUserId");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "QuestAttempts",
                newName: "StartedAt");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "QuestAttempts",
                newName: "CompletedAt");

            migrationBuilder.RenameColumn(
                name: "RatedAt",
                table: "Feedbacks",
                newName: "CreatedAt");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "QuestTasks",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "TimeLimit",
                table: "QuestTasks",
                type: "time",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Quests",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "GlobalTimeLimit",
                table: "Quests",
                type: "time",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Feedbacks",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "AttemptedTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestAttemptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserAnswer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    AttemptedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttemptedTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttemptedTasks_QuestAttempts_QuestAttemptId",
                        column: x => x.QuestAttemptId,
                        principalTable: "QuestAttempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttemptedTasks_QuestTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "QuestTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QuestTaskMedias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    MediaType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestTaskMedias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestTaskMedias_QuestTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "QuestTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskOptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskOptions_QuestTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "QuestTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttemptedTaskOptions",
                columns: table => new
                {
                    AttemptedTaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskOptionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttemptedTaskOptions", x => new { x.AttemptedTaskId, x.TaskOptionId });
                    table.ForeignKey(
                        name: "FK_AttemptedTaskOptions_AttemptedTasks_AttemptedTaskId",
                        column: x => x.AttemptedTaskId,
                        principalTable: "AttemptedTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttemptedTaskOptions_TaskOptions_TaskOptionId",
                        column: x => x.TaskOptionId,
                        principalTable: "TaskOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttemptedTaskOptions_TaskOptionId",
                table: "AttemptedTaskOptions",
                column: "TaskOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_AttemptedTasks_QuestAttemptId",
                table: "AttemptedTasks",
                column: "QuestAttemptId");

            migrationBuilder.CreateIndex(
                name: "IX_AttemptedTasks_TaskId",
                table: "AttemptedTasks",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestTaskMedias_TaskId",
                table: "QuestTaskMedias",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskOptions_TaskId",
                table: "TaskOptions",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestAttempts_Quests_QuestId",
                table: "QuestAttempts",
                column: "QuestId",
                principalTable: "Quests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Users_CreatedByUserId",
                table: "Quests",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestAttempts_Quests_QuestId",
                table: "QuestAttempts");

            migrationBuilder.DropForeignKey(
                name: "FK_Quests_Users_CreatedByUserId",
                table: "Quests");

            migrationBuilder.DropTable(
                name: "AttemptedTaskOptions");

            migrationBuilder.DropTable(
                name: "QuestTaskMedias");

            migrationBuilder.DropTable(
                name: "AttemptedTasks");

            migrationBuilder.DropTable(
                name: "TaskOptions");

            migrationBuilder.DropColumn(
                name: "TimeLimit",
                table: "QuestTasks");

            migrationBuilder.DropColumn(
                name: "GlobalTimeLimit",
                table: "Quests");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "QuestionType",
                table: "QuestTasks",
                newName: "TaskTypeId");

            migrationBuilder.RenameColumn(
                name: "CorrectAnswer",
                table: "QuestTasks",
                newName: "MediaUrl");

            migrationBuilder.RenameColumn(
                name: "CreatedByUserId",
                table: "Quests",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Quests_CreatedByUserId",
                table: "Quests",
                newName: "IX_Quests_AuthorId");

            migrationBuilder.RenameColumn(
                name: "StartedAt",
                table: "QuestAttempts",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "CompletedAt",
                table: "QuestAttempts",
                newName: "EndTime");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Feedbacks",
                newName: "RatedAt");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "QuestTasks",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Quests",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Quests",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "TimeLimitMinutes",
                table: "Quests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "QuestAttempts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "Score",
                table: "QuestAttempts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "AnswerOptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    OptionText = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnswerOptions_QuestTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "QuestTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserQuestTaskAnswers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestAttemptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AnswerText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserQuestTaskAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserQuestTaskAnswers_QuestAttempts_QuestAttemptId",
                        column: x => x.QuestAttemptId,
                        principalTable: "QuestAttempts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserQuestTaskAnswers_QuestTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "QuestTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserAnswerOptions",
                columns: table => new
                {
                    UserAnswerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AnswerOptionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswerOptions", x => new { x.UserAnswerId, x.AnswerOptionId });
                    table.ForeignKey(
                        name: "FK_UserAnswerOptions_AnswerOptions_AnswerOptionId",
                        column: x => x.AnswerOptionId,
                        principalTable: "AnswerOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAnswerOptions_UserQuestTaskAnswers_UserAnswerId",
                        column: x => x.UserAnswerId,
                        principalTable: "UserQuestTaskAnswers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuestTasks_TaskTypeId",
                table: "QuestTasks",
                column: "TaskTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerOptions_TaskId",
                table: "AnswerOptions",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswerOptions_AnswerOptionId",
                table: "UserAnswerOptions",
                column: "AnswerOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserQuestTaskAnswers_QuestAttemptId",
                table: "UserQuestTaskAnswers",
                column: "QuestAttemptId");

            migrationBuilder.CreateIndex(
                name: "IX_UserQuestTaskAnswers_TaskId",
                table: "UserQuestTaskAnswers",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestAttempts_Quests_QuestId",
                table: "QuestAttempts",
                column: "QuestId",
                principalTable: "Quests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Quests_Users_AuthorId",
                table: "Quests",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestTasks_TaskTypes_TaskTypeId",
                table: "QuestTasks",
                column: "TaskTypeId",
                principalTable: "TaskTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

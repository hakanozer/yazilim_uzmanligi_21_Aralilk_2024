using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Titan.Migrations
{
    /// <inheritdoc />
    public partial class SyncAimActivitySchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aims_ActivityGoals_ActivityGoalId",
                table: "Aims");

            migrationBuilder.DropTable(
                name: "ActivityGoals");

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Activity = table.Column<string>(type: "TEXT", nullable: false),
                    Detail = table.Column<string>(type: "TEXT", nullable: false),
                    DurationMinute = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ValidUntil = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Aims_Activities_ActivityGoalId",
                table: "Aims",
                column: "ActivityGoalId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aims_Activities_ActivityGoalId",
                table: "Aims");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.CreateTable(
                name: "ActivityGoals",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Activity = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Detail = table.Column<string>(type: "TEXT", nullable: false),
                    DurationMinute = table.Column<string>(type: "TEXT", nullable: false),
                    ValidUntil = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityGoals", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Aims_ActivityGoals_ActivityGoalId",
                table: "Aims",
                column: "ActivityGoalId",
                principalTable: "ActivityGoals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

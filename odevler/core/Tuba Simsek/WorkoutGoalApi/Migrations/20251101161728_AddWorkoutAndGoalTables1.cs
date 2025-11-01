using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkoutGoalApi.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkoutAndGoalTables1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Detail",
                table: "Goals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Detail",
                table: "Goals");
        }
    }
}

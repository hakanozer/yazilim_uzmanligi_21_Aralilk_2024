using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessTracker_API.Migrations
{
    /// <inheritdoc />
    public partial class FitnessApp4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "wid",
                table: "Workouts",
                newName: "Wid");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Goals",
                newName: "Gid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Wid",
                table: "Workouts",
                newName: "wid");

            migrationBuilder.RenameColumn(
                name: "Gid",
                table: "Goals",
                newName: "Id");
        }
    }
}

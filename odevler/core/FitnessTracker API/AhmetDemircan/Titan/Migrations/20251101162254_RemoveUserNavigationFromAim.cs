using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Titan.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserNavigationFromAim : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aims_Users_UserId",
                table: "Aims");

            migrationBuilder.DropIndex(
                name: "IX_Aims_UserId",
                table: "Aims");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Aims_UserId",
                table: "Aims",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Aims_Users_UserId",
                table: "Aims",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

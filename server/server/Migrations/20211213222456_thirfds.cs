
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class thirfds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "fieldOfWord",
                table: "Employers",
                newName: "fieldOfWork");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "fieldOfWork",
                table: "Employers",
                newName: "fieldOfWord");
        }
    }
}

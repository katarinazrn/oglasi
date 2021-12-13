using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "filedOfWork",
                table: "JobListings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "filedOfWork",
                table: "JobListings");
        }
    }
}

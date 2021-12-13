using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employers",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    imageUrl = table.Column<string>(nullable: true),
                    PIB = table.Column<string>(nullable: true),
                    address = table.Column<string>(nullable: true),
                    website = table.Column<string>(nullable: true),
                    phone = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "JobListings",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    title = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    dateCreated = table.Column<DateTime>(nullable: false),
                    deadline = table.Column<DateTime>(nullable: false),
                    employerId = table.Column<long>(nullable: false),
                    location = table.Column<string>(nullable: true),
                    seniority = table.Column<string>(nullable: true),
                    tags = table.Column<string>(nullable: true),
                    linkToApply = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobListings", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employers");

            migrationBuilder.DropTable(
                name: "JobListings");
        }
    }
}

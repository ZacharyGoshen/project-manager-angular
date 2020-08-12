using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectManagerAngular.Migrations
{
    public partial class AddTaskDueDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DueDateEnd",
                table: "Tasks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DueDateStart",
                table: "Tasks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDateEnd",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "DueDateStart",
                table: "Tasks");
        }
    }
}

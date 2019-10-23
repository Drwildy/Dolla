using Microsoft.EntityFrameworkCore.Migrations;

namespace DollaWeb.Migrations
{
    public partial class dropUsernameMB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_MoneyBox_Username",
                table: "MoneyBox",
                schema: null);

            migrationBuilder.DropColumn(
                name: "Username",
                table: "MoneyBox",
                schema: null);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace DollaWeb.Migrations
{
    public partial class PiggyBankAllocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "test",
                table: "MoneyBox");

            migrationBuilder.AddColumn<double>(
                name: "monthlyAllocation",
                table: "MoneyBox",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "monthlyAllocation",
                table: "MoneyBox");

            migrationBuilder.AddColumn<string>(
                name: "test",
                table: "MoneyBox",
                nullable: true);
        }
    }
}

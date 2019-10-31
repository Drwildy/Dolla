using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DollaWeb.Migrations
{
    public partial class SalarySettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SalarySettingsId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Salaries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUser = table.Column<string>(nullable: true),
                    IsSalary = table.Column<bool>(nullable: false),
                    SalaryAmount = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salaries", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_SalarySettingsId",
                table: "AspNetUsers",
                column: "SalarySettingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Salaries_SalarySettingsId",
                table: "AspNetUsers",
                column: "SalarySettingsId",
                principalTable: "Salaries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Salaries_SalarySettingsId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Salaries");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_SalarySettingsId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SalarySettingsId",
                table: "AspNetUsers");
        }
    }
}

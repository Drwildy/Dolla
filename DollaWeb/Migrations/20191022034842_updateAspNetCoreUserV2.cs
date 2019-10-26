using Microsoft.EntityFrameworkCore.Migrations;

namespace DollaWeb.Migrations
{
    public partial class updateAspNetCoreUserV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropIndex(
                name: "IX_MoneyBox_UserSettingsId",
                table: "MoneyBox",
                schema: null);

            migrationBuilder.DropIndex(
                name: "IX_Transaction_Username",
                table: "Transaction",
                schema: null);

            migrationBuilder.DropForeignKey(
                name: "FK_MoneyBox_UserSettings_UserSettingsId",
                table: "MoneyBox");

            migrationBuilder.DropColumn(
                name: "UserSettingsId",
                table: "MoneyBox",
                schema: null);

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Transaction",
                schema: null);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Transaction",
                maxLength: 450,
                nullable: false,
                schema: null);

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_AspNetUsers_ApplicationUserId",
                table: "Transaction",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

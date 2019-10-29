using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DollaWeb.Migrations
{
    public partial class PaidBillTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaidBill",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BillId = table.Column<int>(nullable: true),
                    TransactionId = table.Column<int>(nullable: true),
                    Month = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaidBill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaidBill_MoneyBox_BillId",
                        column: x => x.BillId,
                        principalTable: "MoneyBox",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PaidBill_Transaction_TransactionId",
                        column: x => x.TransactionId,
                        principalTable: "Transaction",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaidBill_BillId",
                table: "PaidBill",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_PaidBill_TransactionId",
                table: "PaidBill",
                column: "TransactionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaidBill");
        }
    }
}

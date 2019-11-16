using Microsoft.EntityFrameworkCore.Migrations;

namespace DollaWeb.Migrations
{
    public partial class UpdatePaidBill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaidBill_Transaction_TransactionId",
                table: "PaidBill");

            migrationBuilder.RenameColumn(
                name: "TransactionId",
                table: "PaidBill",
                newName: "AddPaymentMethodId");

            migrationBuilder.RenameIndex(
                name: "IX_PaidBill_TransactionId",
                table: "PaidBill",
                newName: "IX_PaidBill_AddPaymentMethodId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaidBill_AddPaymentMethod_AddPaymentMethodId",
                table: "PaidBill",
                column: "AddPaymentMethodId",
                principalTable: "AddPaymentMethod",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaidBill_AddPaymentMethod_AddPaymentMethodId",
                table: "PaidBill");

            migrationBuilder.RenameColumn(
                name: "AddPaymentMethodId",
                table: "PaidBill",
                newName: "TransactionId");

            migrationBuilder.RenameIndex(
                name: "IX_PaidBill_AddPaymentMethodId",
                table: "PaidBill",
                newName: "IX_PaidBill_TransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaidBill_Transaction_TransactionId",
                table: "PaidBill",
                column: "TransactionId",
                principalTable: "Transaction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

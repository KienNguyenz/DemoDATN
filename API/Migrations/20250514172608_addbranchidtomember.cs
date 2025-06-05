using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DemoGym.Migrations
{
    /// <inheritdoc />
    public partial class addbranchidtomember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "members",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_members_BranchId",
                table: "members",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_members_branches_BranchId",
                table: "members",
                column: "BranchId",
                principalTable: "branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_members_branches_BranchId",
                table: "members");

            migrationBuilder.DropIndex(
                name: "IX_members_BranchId",
                table: "members");


            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "members");
        }
    }
}

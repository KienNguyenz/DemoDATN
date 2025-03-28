using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DemoGym.Migrations
{
    /// <inheritdoc />
    public partial class up : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_members_PackageId",
                table: "members");

            migrationBuilder.AlterColumn<int>(
                name: "PackageId",
                table: "members",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_members_PackageId",
                table: "members",
                column: "PackageId",
                unique: true,
                filter: "[PackageId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_members_PackageId",
                table: "members");

            migrationBuilder.AlterColumn<int>(
                name: "PackageId",
                table: "members",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_members_PackageId",
                table: "members",
                column: "PackageId",
                unique: true);
        }
    }
}

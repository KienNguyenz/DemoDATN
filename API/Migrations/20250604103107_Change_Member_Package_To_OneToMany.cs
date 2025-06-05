using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DemoGym.Migrations
{
    /// <inheritdoc />
    public partial class Change_Member_Package_To_OneToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_members_PackageId",
                table: "members");

            migrationBuilder.CreateIndex(
                name: "IX_members_PackageId",
                table: "members",
                column: "PackageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_members_PackageId",
                table: "members");

            migrationBuilder.CreateIndex(
                name: "IX_members_PackageId",
                table: "members",
                column: "PackageId",
                unique: true,
                filter: "[PackageId] IS NOT NULL");
        }
    }
}

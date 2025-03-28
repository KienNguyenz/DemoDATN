using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DemoGym.Migrations
{
    /// <inheritdoc />
    public partial class ud : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AspNetUserID",
                table: "members",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AspNetUserID",
                table: "members");
        }
    }
}

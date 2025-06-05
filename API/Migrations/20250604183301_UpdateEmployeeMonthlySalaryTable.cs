using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DemoGym.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEmployeeMonthlySalaryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.DropColumn(
                name: "YearMonth",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.RenameColumn(
                name: "WorkingDay",
                table: "EmployeeMonthlySalaries",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "Salary",
                table: "EmployeeMonthlySalaries",
                newName: "SalaryAmount");

            migrationBuilder.AddColumn<string>(
                name: "CreateBy",
                table: "EmployeeMonthlySalaries",
                type: "NVARCHAR(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "EmployeeMonthlySalaries",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "EmployeeMonthlySalaries",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "EmployeeMonthlySalaries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UpdateBy",
                table: "EmployeeMonthlySalaries",
                type: "NVARCHAR(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDate",
                table: "EmployeeMonthlySalaries",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkingDays",
                table: "EmployeeMonthlySalaries",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.DropColumn(
                name: "UpdateBy",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.DropColumn(
                name: "WorkingDays",
                table: "EmployeeMonthlySalaries");

            migrationBuilder.RenameColumn(
                name: "Year",
                table: "EmployeeMonthlySalaries",
                newName: "WorkingDay");

            migrationBuilder.RenameColumn(
                name: "SalaryAmount",
                table: "EmployeeMonthlySalaries",
                newName: "Salary");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "EmployeeMonthlySalaries",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "YearMonth",
                table: "EmployeeMonthlySalaries",
                type: "nvarchar(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "");
        }
    }
}

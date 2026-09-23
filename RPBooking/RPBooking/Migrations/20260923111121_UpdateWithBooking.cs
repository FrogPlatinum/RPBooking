using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RPBooking.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWithBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Participants_Bookings_BookingId",
                table: "Participants");

            migrationBuilder.AddForeignKey(
                name: "FK_Participants_Bookings_BookingId",
                table: "Participants",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Participants_Bookings_BookingId",
                table: "Participants");

            migrationBuilder.AddForeignKey(
                name: "FK_Participants_Bookings_BookingId",
                table: "Participants",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id");
        }
    }
}

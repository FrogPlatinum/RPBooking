using Microsoft.AspNetCore.Identity;

namespace RPBooking.Features.Identity
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public enum UserRole
        {
            User,
            Admin
        }
    }
}

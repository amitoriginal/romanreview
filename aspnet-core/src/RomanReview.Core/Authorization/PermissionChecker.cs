using Abp.Authorization;
using RomanReview.Authorization.Roles;
using RomanReview.Authorization.Users;

namespace RomanReview.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

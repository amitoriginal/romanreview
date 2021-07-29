namespace RomanReview.Authorization.Roles
{
    public static class StaticRoleNames
    {
        public static class Host
        {
            public const string Admin = "Admin";
            public const string Owner = "Owner";
            public const string Regular = "Regular";
        }

        public static class Tenants
        {
            public const string Admin = "Admin";
        }
    }
}

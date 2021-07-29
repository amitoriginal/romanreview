using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace RomanReview.EntityFrameworkCore
{
    public static class RomanReviewDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<RomanReviewDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<RomanReviewDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

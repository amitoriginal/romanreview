using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RomanReview.Configuration;
using RomanReview.Web;

namespace RomanReview.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class RomanReviewDbContextFactory : IDesignTimeDbContextFactory<RomanReviewDbContext>
    {
        public RomanReviewDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<RomanReviewDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            RomanReviewDbContextConfigurer.Configure(builder, configuration.GetConnectionString(RomanReviewConsts.ConnectionStringName));

            return new RomanReviewDbContext(builder.Options);
        }
    }
}

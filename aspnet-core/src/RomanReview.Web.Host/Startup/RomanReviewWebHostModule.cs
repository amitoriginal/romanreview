using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using RomanReview.Configuration;

namespace RomanReview.Web.Host.Startup
{
    [DependsOn(
       typeof(RomanReviewWebCoreModule))]
    public class RomanReviewWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public RomanReviewWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(RomanReviewWebHostModule).GetAssembly());
        }
    }
}

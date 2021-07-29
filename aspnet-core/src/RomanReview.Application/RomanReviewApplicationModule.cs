using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using RomanReview.Authorization;

namespace RomanReview
{
    [DependsOn(
        typeof(RomanReviewCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class RomanReviewApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<RomanReviewAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(RomanReviewApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}

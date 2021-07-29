using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace RomanReview.Controllers
{
    public abstract class RomanReviewControllerBase: AbpController
    {
        protected RomanReviewControllerBase()
        {
            LocalizationSourceName = RomanReviewConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

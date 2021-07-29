using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using RomanReview.Configuration.Dto;

namespace RomanReview.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : RomanReviewAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

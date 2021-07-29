using System.Threading.Tasks;
using RomanReview.Configuration.Dto;

namespace RomanReview.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

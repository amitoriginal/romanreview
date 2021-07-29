using System.Threading.Tasks;
using Abp.Application.Services;
using RomanReview.Sessions.Dto;

namespace RomanReview.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

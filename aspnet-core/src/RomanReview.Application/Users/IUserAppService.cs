using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using RomanReview.Roles.Dto;
using RomanReview.Users.Dto;

namespace RomanReview.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}

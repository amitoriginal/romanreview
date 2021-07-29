using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using RomanReview.Objects.Dto;

namespace RomanReview.Objects
{
    public interface IObjectAppService : IAsyncCrudAppService<ObjectDto, int, PagedObjectResultRequestDto, CreateObjectDto, ObjectDto>
    {
        // Task<ListResultDto<ObjectListDto>> GetObjectsAsync(GetObjectsInput input);
    }
}

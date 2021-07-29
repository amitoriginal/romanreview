using Abp.Application.Services;
using Abp.Application.Services.Dto;
using RomanReview.MultiTenancy.Dto;

namespace RomanReview.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}


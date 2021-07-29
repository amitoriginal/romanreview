using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using RomanReview.Reviews.Dto;

namespace RomanReview.Reviews
{
    public interface IReviewAppService : IAsyncCrudAppService<ReviewDto, int, PagedReviewResultRequestDto, CreateReviewDto, UpdateReviewDto>
    {
    }
}

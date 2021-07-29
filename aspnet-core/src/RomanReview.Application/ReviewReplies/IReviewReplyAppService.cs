using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using RomanReview.ReviewReplies.Dto;

namespace RomanReview.ReviewReplies
{
    public interface IReviewReplyAppService : IAsyncCrudAppService<ReviewReplyDto, int, PagedReviewReplyResultRequestDto, CreateReviewReplyDto, ReviewReplyDto>
    {
    }
}

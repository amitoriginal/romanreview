using Abp.Application.Services.Dto;

namespace RomanReview.Reviews.Dto
{
    public class PagedReviewResultRequestDto : PagedAndSortedResultRequestDto
    {
        public long? OwnerId { get; set; }
        public long? ObjectId { get; set; }
    }
}


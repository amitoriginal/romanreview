using Abp.Application.Services.Dto;

namespace RomanReview.Objects.Dto
{
    public class PagedObjectResultRequestDto : PagedAndSortedResultRequestDto, ILimitedResultRequest
    {
        public long? OwnerId { get; set; }
    }
}


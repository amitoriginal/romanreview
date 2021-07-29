using System;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;

namespace RomanReview.ReviewReplies.Dto
{
    public class ReviewReplyListDto : EntityDto, IHasCreationTime
    {
        public string Comment { get; set; }

        public DateTime CreationTime { get; set; }
    }
}

using System;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;

namespace RomanReview.Reviews.Dto
{
    public class ReviewListDto : EntityDto, IHasCreationTime
    {
        public string Comment { get; set; }

        public DateTime CreationTime { get; set; }
    }
}

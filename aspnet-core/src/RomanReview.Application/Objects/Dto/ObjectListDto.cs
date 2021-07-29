using System;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;

namespace RomanReview.Objects.Dto
{
    public class ObjectListDto : EntityDto, IHasCreationTime
    {
        public string Name { get; set; }

        public DateTime CreationTime { get; set; }
    }
}

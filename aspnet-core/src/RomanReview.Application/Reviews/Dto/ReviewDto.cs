using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using RomanReview.DataModels;

namespace RomanReview.Reviews.Dto
{
    [AutoMap(typeof(Review))]
    public class ReviewDto : EntityDto<int>
    {
        [Required]
        public string Comment { get; set; }
        
        [Required]
        public int OwnerUserId { get; set; }

        public int Rate { get; set; }

        [Required]
        public DateTime VisitDate { get; set; }

        public DateTime CreationTime { get; set; }

        public int? ActiveReplyId { get; set; }
        public string ActiveReplyMessage { get; set; }
        public string ObjectName { get; set; }
    }
}
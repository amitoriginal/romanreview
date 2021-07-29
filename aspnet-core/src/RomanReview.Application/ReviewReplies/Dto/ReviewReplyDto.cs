using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using RomanReview.DataModels;

namespace RomanReview.ReviewReplies.Dto
{
    [AutoMap(typeof(ReviewReply))]
    public class ReviewReplyDto : EntityDto<int>
    {
        [Required]
        public string Comment { get; set; }       
    }
}
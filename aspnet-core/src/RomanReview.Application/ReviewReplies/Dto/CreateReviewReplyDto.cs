using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Authorization.Roles;
using Abp.AutoMapper;
using RomanReview.Authorization.Roles;
using RomanReview.DataModels;

namespace RomanReview.ReviewReplies.Dto
{
    [AutoMapTo(typeof(ReviewReply))]
    public class CreateReviewReplyDto
    {
        [Required]
        public string Comment { get; set; }     
        
        [Required]
        public long ReviewId { get; set; }
    }
}

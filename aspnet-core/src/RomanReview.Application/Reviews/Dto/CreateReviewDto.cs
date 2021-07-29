using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Authorization.Roles;
using Abp.AutoMapper;
using RomanReview.Authorization.Roles;
using RomanReview.DataModels;

namespace RomanReview.Reviews.Dto
{
    [AutoMapTo(typeof(Review))]
    public class CreateReviewDto
    {
        [Required]
        public string Comment { get; set; }     
        
        [Required]
        public long ObjectId { get; set; }

        [Required]
        public int Rate { get; set; }

        [Required]
        public DateTime VisitDate { get; set; } // TODO: limit to date only
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.Authorization.Roles;
using Abp.AutoMapper;
using RomanReview.Authorization.Roles;
using RomanReview.DataModels;

namespace RomanReview.Reviews.Dto
{
    [AutoMapTo(typeof(Review))]
    public class UpdateReviewDto : IEntityDto<int>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Comment { get; set; }

        public int Rate { get; set; }

        [Required]
        public DateTime VisitDate { get; set; }
    }
}

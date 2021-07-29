using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using RomanReview.DataModels;

namespace RomanReview.Objects.Dto
{
    [AutoMap(typeof(Object))]
    public class ObjectDto : EntityDto<int>
    {
        [Required]
        [StringLength(Object.MaxNameLength)]
        public string Name { get; set; }
        
        [Required]
        public int OwnerUserId { get; set; }

        public double Rating { get; set; }

        public int? LowestRatedReviewId { get; set; }
        public int? HighestRatedReviewId { get; set; }
    }
}
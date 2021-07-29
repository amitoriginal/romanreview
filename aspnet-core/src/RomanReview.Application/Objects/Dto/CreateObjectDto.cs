using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Authorization.Roles;
using Abp.AutoMapper;
using RomanReview.Authorization.Roles;
using RomanReview.DataModels;

namespace RomanReview.Objects.Dto
{
    [AutoMapTo(typeof(Object))]
    public class CreateObjectDto
    {
        [Required]
        [StringLength(Object.MaxNameLength)]
        public string Name { get; set; }       
    }
}

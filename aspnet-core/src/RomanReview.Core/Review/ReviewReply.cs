using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using RomanReview.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RomanReview.DataModels
{
    public class ReviewReply : FullAuditedEntity
    {
        public string Comment { get; set; }

        [ForeignKey("Review")]
        [Required]
        public int ReviewId { get; set; }

        public virtual Review Review { get; set; }
    }
}

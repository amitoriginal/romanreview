using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using RomanReview.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RomanReview.DataModels
{
    public class Object : FullAuditedEntity
    {
        public const double DefaultRating = 4;

        public const int MaxNameLength = 200;

        [Required]
        [StringLength(Object.MaxNameLength)]
        public string Name { get; set; }

        [ForeignKey("Owner")]
        [Required]
        public long OwnerUserId { get; set; }

        public virtual User Owner { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }
        [NotMapped]
        public double Rating { get; set; }
    }
}

using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using RomanReview.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RomanReview.DataModels
{
    public class Review : FullAuditedEntity
    {
        public int Rate { get; set; }

        public DateTime VisitDate { get; set; }

        public string Comment { get; set; }

        [ForeignKey("Owner")]
        [Required]
        public long OwnerUserId { get; set; }

        public virtual User Owner { get; set; }

        [ForeignKey("Object")]
        [Required]
        public int ObjectId { get; set; }

        public virtual Object Object { get; set; }

        [ForeignKey("ActiveReply")]
        public int? ActiveReplyId { get; set; }

        public virtual ReviewReply ActiveReply { get; set; }
    }
}

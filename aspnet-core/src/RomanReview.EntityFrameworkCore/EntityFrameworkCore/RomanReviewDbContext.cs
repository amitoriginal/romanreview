using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using RomanReview.Authorization.Roles;
using RomanReview.Authorization.Users;
using RomanReview.MultiTenancy;
using RomanReview.DataModels;

namespace RomanReview.EntityFrameworkCore
{
    public class RomanReviewDbContext : AbpZeroDbContext<Tenant, Role, User, RomanReviewDbContext>
    {
        public DbSet<Object> Objects { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ReviewReply> ReviewReplies { get; set; }

        public RomanReviewDbContext(DbContextOptions<RomanReviewDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Review>().HasOne(s => s.Owner)
                .WithMany().OnDelete(DeleteBehavior.Restrict);
            base.OnModelCreating(modelBuilder);
        }
    }
}

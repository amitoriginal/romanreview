using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using RomanReview.Authorization;
using Microsoft.AspNetCore.Identity;
using RomanReview.DataModels;
using RomanReview.ReviewReplies.Dto;
using Abp.Runtime.Validation;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace RomanReview.ReviewReplies
{
    [AbpAuthorize(PermissionNames.Pages_Roles)] // TODO: 
    public class ReviewReplyAppService : AsyncCrudAppService<ReviewReply, ReviewReplyDto, int, PagedReviewReplyResultRequestDto, CreateReviewReplyDto, ReviewReplyDto>, IReviewReplyAppService
    {
        protected readonly IRepository<Review> ReviewRepository;

        public ReviewReplyAppService(IRepository<ReviewReply> repository, IRepository<Review> reviewRepository)
            : base(repository)
        {
            ReviewRepository = reviewRepository;
        }

        public override async Task<ReviewReplyDto> Create(CreateReviewReplyDto input)
        {
            CheckCreatePermission();

            // TODO: make sure it matches owner's id var userId = AbpSession.UserId.Value;

            var entity = MapToEntity(input);

            var parent = await ReviewRepository.GetAsync(entity.ReviewId);
            if (parent.ActiveReplyId.HasValue)
            {
                var errorMessage = "Only one reply is allowed per review";
                throw new AbpValidationException(errorMessage, new[] { new ValidationResult(errorMessage) });
            }

            await Repository.InsertAsync(entity); 

            await CurrentUnitOfWork.SaveChangesAsync(); // To get new reply's id.

            parent.ActiveReplyId = entity.Id;

            await ReviewRepository.UpdateAsync(parent);

            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
        }

        public override async Task<ReviewReplyDto> Update(ReviewReplyDto input)
        {
            CheckUpdatePermission();
            // TODO: make sure it matches owner's id var userId = AbpSession.UserId.Value;

            var entity = await GetEntityByIdAsync(input.Id);

            // MapToEntity(input, entity);
            // only allow to change Comment
            entity.Comment = input.Comment;

            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
        }

        public override async Task Delete(EntityDto<int> input)
        {
            CheckDeletePermission();
            // TODO: make sure it matches owner's id var userId = AbpSession.UserId.Value;

            var entity = await GetEntityByIdAsync(input.Id);
            var parent = await ReviewRepository.GetAsync(entity.ReviewId);
            if (parent.ActiveReplyId == entity.Id)
            {
                parent.ActiveReplyId = null;
            }

            await Repository.DeleteAsync(entity);
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }

    }
}


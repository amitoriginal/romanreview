using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using Abp.Linq.Extensions;
using RomanReview.Authorization;
using Microsoft.AspNetCore.Identity;
using RomanReview.DataModels;
using RomanReview.Reviews.Dto;
using Abp.Domain.Entities;

namespace RomanReview.Reviews
{
    [AbpAuthorize(PermissionNames.Pages_Roles)] // TODO: 
    public class ReviewAppService : AsyncCrudAppService<Review, ReviewDto, int, PagedReviewResultRequestDto, CreateReviewDto, UpdateReviewDto>, IReviewAppService
    {
        protected readonly IRepository<Object> ObjectRepository;

        public ReviewAppService(IRepository<Review> repository, IRepository<Object> objectRepository)
            : base(repository)
        {
            ObjectRepository = objectRepository;
        }

        protected override async Task<Review> GetEntityByIdAsync(int id)
        {
            var query = Repository.GetAllIncluding(x => x.Object, x => x.ActiveReply)
                .Where(x => !x.IsDeleted && x.Id == id);

            var entity = await AsyncQueryableExecuter.FirstOrDefaultAsync(query);
            if (entity == null)
            {
                throw new EntityNotFoundException(typeof(Review), id);
            }
            return entity;
        }
        protected override ReviewDto MapToEntityDto(Review entity)
        {
            var dto = base.MapToEntityDto(entity);
            dto.ObjectName = entity.Object.Name;
            if (entity.ActiveReply != null)
            {
                dto.ActiveReplyMessage = entity.ActiveReply.Comment;
            }
            return dto;
        }

        public override async Task<ReviewDto> Create(CreateReviewDto input)
        {
            CheckCreatePermission();
            // TODO: check that user id doesn't match owner id

            var userId = AbpSession.UserId.Value;

            var entity = MapToEntity(input);
            var parent = await ObjectRepository.GetAsync(entity.ObjectId);
            entity.Object = parent;

            entity.OwnerUserId = userId; 

            await Repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
        }

        protected override IQueryable<Review> CreateFilteredQuery(PagedReviewResultRequestDto input)
        {
            return Repository.GetAllIncluding(t => t.ActiveReply, t => t.Object)
                .WhereIf(input.OwnerId.HasValue, t => t.OwnerUserId == input.OwnerId)
                .WhereIf(input.ObjectId.HasValue, t => t.ObjectId == input.ObjectId); 
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }

    }
}


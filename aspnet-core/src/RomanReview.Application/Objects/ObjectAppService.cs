using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.IdentityFramework;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using RomanReview.Authorization;
using RomanReview.Objects.Dto;
using Microsoft.AspNetCore.Identity;
using RomanReview.DataModels;
using Abp.Domain.Entities;

namespace RomanReview.Objects
{
    [AbpAuthorize(PermissionNames.Pages_Roles)] // TODO: 
    public class ObjectAppService : AsyncCrudAppService<Object, ObjectDto, int, PagedObjectResultRequestDto, CreateObjectDto, ObjectDto>, IObjectAppService
    {
        protected class ExtendedObject
        {
            public Object Object { get; set; }
            public double Rating { get; set; }

            public Review LowestRatedReview { get; set; }
            public Review HighestRatedReview { get; set; }
        }

        public ObjectAppService(IRepository<Object> repository)
            : base(repository)
        {
        }

        public override async Task<ObjectDto> Create(CreateObjectDto input)
        {
            CheckCreatePermission();

            var userId = AbpSession.UserId.Value;

            var entity = MapToEntity(input);

            entity.OwnerUserId = userId;

            await Repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();

            var dto = MapToEntityDto(entity);
            dto.Rating = Object.DefaultRating;
            return dto;
        }

        protected override IQueryable<Object> CreateFilteredQuery(PagedObjectResultRequestDto input)
        {
            throw new System.NotSupportedException();
        }

        public override async Task<ObjectDto> Get(EntityDto<int> input)
        {
            CheckGetPermission();

            var query = ExtendQueryWithHighestAndLowestReview(Repository.GetAll()
                .Where(x => !x.IsDeleted && x.Id == input.Id));

            var entity = await AsyncQueryableExecuter.FirstOrDefaultAsync(query);
            if (entity == null)
            {
                throw new EntityNotFoundException(typeof(Object), input.Id);
            }

            var dto = MapToEntityDto(entity);
            return dto;
        }

        protected IQueryable<ExtendedObject> ExtendQuery(IQueryable<Object> query)
        {
            return query.Select(x => new ExtendedObject {
                Object = x,
                Rating = x.Reviews.Where(r => !r.IsDeleted).Select(r => (double)r.Rate).DefaultIfEmpty(Object.DefaultRating).Average(),
            });
        }

        protected IQueryable<ExtendedObject> ExtendQueryWithHighestAndLowestReview(IQueryable<Object> query)
        {
            return query.Select(x => new ExtendedObject
            {
                Object = x,
                Rating = x.Reviews.Where(r => !r.IsDeleted).Select(r => (double)r.Rate).DefaultIfEmpty(Object.DefaultRating).Average(),
                LowestRatedReview = x.Reviews.OrderByDescending(r => r.VisitDate).FirstOrDefault(r => !r.IsDeleted && r.Rate == x.Reviews.Where(y => !y.IsDeleted).Min(y => y.Rate)),
                HighestRatedReview = x.Reviews.OrderByDescending(r => r.VisitDate).FirstOrDefault(r => !r.IsDeleted && r.Rate == x.Reviews.Where(y => !y.IsDeleted).Max(y => y.Rate))
            });
        }

        protected ObjectDto MapToEntityDto(ExtendedObject obj)
        {
            var dto = MapToEntityDto(obj.Object);
            dto.Rating = obj.Rating;
            dto.LowestRatedReviewId = obj.LowestRatedReview?.Id;
            dto.HighestRatedReviewId = obj.HighestRatedReview?.Id;
            return dto;
        }
        public override async Task<PagedResultDto<ObjectDto>> GetAll(PagedObjectResultRequestDto input)
        {
            CheckGetAllPermission();

            var query = ExtendQuery(Repository.GetAll()
                .WhereIf(input.OwnerId.HasValue, t => t.OwnerUserId == input.OwnerId)                
                );

            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            // apply sorting
            if (!input.Sorting.IsNullOrWhiteSpace())
            {
                query = query.OrderBy(input.Sorting);
            }
            //we should sort if Take will be used.
            query = query.OrderByDescending(e => e.Object.Id);

            // apply paging
            query = query.PageBy(input);
            query = query.Take(input.MaxResultCount);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<ObjectDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}


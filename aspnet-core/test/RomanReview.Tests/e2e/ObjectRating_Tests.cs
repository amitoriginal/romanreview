using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;
using Abp.Application.Services.Dto;
using RomanReview.Users;
using RomanReview.Users.Dto;
using RomanReview.Objects;
using RomanReview.Reviews;
using System;
using System.Linq;
using RomanReview.Reviews.Dto;

namespace RomanReview.Tests.e2e
{
    public class ObjectRating_Tests : RomanReviewTestBase
    {
        private readonly IObjectAppService _objectAppService;
        private readonly IReviewAppService _reviewAppService;
        private readonly IUserAppService _userAppService;

        public ObjectRating_Tests()
        {
            _objectAppService = Resolve<IObjectAppService>();
            _reviewAppService = Resolve<IReviewAppService>();
            _userAppService = Resolve<IUserAppService>();
        }

        [Fact]
        public async Task TestAverageRating()
        {
            // Act
            var user1 = await _userAppService.Create(
                new CreateUserDto
                {
                    EmailAddress = "john@volosoft.com",
                    IsActive = true,
                    Name = "John",
                    Surname = "Nash",
                    Password = "123qwe",
                    UserName = "john.nash"
                });

            var obj = await _objectAppService.Create(
                new Objects.Dto.CreateObjectDto
                {
                    Name = "Erevan"
                });

            var review1 = await _reviewAppService.Create(
                new CreateReviewDto
                {
                    ObjectId = obj.Id,
                    Comment = "Perfect!",
                    Rate = 5,
                    VisitDate = DateTime.Today
                });

            // TODO: should be under different user
            var review2 = await _reviewAppService.Create(
                new CreateReviewDto
                {
                    ObjectId = obj.Id,
                    Comment = "Bad!",
                    Rate = 2,
                    VisitDate = DateTime.Today
                });

            var list = await _objectAppService.GetAll(
                new Objects.Dto.PagedObjectResultRequestDto
                {
                    MaxResultCount = 100
                });

            var found = list.Items.Single();

            found.Rating.ShouldBe(3.5);
        }
    }
}

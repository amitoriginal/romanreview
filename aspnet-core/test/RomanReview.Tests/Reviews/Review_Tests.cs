using System.Threading.Tasks;
using Shouldly;
using Xunit;
using RomanReview.Users;
using RomanReview.Users.Dto;
using RomanReview.Objects;
using RomanReview.Reviews;
using System;
using System.Linq;
using RomanReview.Reviews.Dto;

namespace RomanReview.Tests.Reviews
{
    public class Review_Tests : RomanReviewTestBase
    {
        private readonly IObjectAppService _objectAppService;
        private readonly IReviewAppService _reviewAppService;

        public Review_Tests()
        {
            _objectAppService = Resolve<IObjectAppService>();
            _reviewAppService = Resolve<IReviewAppService>();
        }

        [Fact]
        public async Task TestSorting()
        {
            // Act
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
                    VisitDate = DateTime.Today.AddDays(1)
                });

            var list = await _reviewAppService.GetAll(
                new PagedReviewResultRequestDto
                {
                    MaxResultCount = 100,
                    Sorting = "VisitDate"
                });

            var list2 = await _reviewAppService.GetAll(
                new PagedReviewResultRequestDto
                {
                    MaxResultCount = 100,
                    Sorting = "VisitDate desc"
                });

            // Assert
            list.Items[0].Id.ShouldBe(review1.Id);
            list2.Items[0].Id.ShouldBe(review2.Id);

        }
    }
}

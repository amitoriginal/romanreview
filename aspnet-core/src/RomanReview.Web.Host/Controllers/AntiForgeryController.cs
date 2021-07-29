using Microsoft.AspNetCore.Antiforgery;
using RomanReview.Controllers;

namespace RomanReview.Web.Host.Controllers
{
    public class AntiForgeryController : RomanReviewControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}

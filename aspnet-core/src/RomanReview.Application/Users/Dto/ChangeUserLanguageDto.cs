using System.ComponentModel.DataAnnotations;

namespace RomanReview.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
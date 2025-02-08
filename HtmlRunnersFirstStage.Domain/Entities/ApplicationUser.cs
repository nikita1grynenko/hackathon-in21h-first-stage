    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNetCore.Identity;

    namespace HtmlRunnersFirstStage.Domain.Entities;

    public class ApplicationUser : IdentityUser<Guid>
    {
        public string? AvatarUrl { get; set; }

        public ICollection<Quest> QuestsCreated { get; set; } = new List<Quest>();
        public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
        public ICollection<QuestAttempt> QuestAttempts { get; set; } = new List<QuestAttempt>();
    }
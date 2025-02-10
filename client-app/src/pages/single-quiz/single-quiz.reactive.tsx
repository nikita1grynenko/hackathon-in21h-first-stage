import React from "react";
import { useParams } from "react-router-dom";
import "./single-quiz.style.css";
import { useQuestById } from "../../hooks/quest.hook";
import formatDateTime from "../../utils/date-time-format";

// const quizzes = [
//   {
//     id: 1,
//     title: "Придумати ідею",
//     tags: ["Тест", "Змагання", "Складний"],
//     author: "Dude",
//     date: "06.02.2025",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, beatae aliquid, impedit nisi unde dolorem error, neque voluptatum quibusdam dolorum aliquam. Iure molestiae, magnam itaque magni molestias ducimus earum eligendi.",
//     comments: [
//       {
//         author: "Dude",
//         text: "Хороший тамада, і конкурси веселі.",
//         date: "07.02.2025",
//         time: "13:22",
//       },
//       {
//         author: "Dude",
//         text: "Це якийсь пздц",
//         date: "06.02.2025",
//         time: "17:22",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Придумати дизайн",
//     tags: ["Тест", "Команда", "Простий"],
//     author: "Dude",
//     date: "06.02.2025",
//     content: "Це текст про дизайн...",
//   },
// ];

const SingleQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: quest, isLoading, isError, error } = useQuestById(id ?? "");
  // const quiz = quizzes.find((q) => q.id === Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!quest) {
    return <h2>Квест не знайдено!</h2>;
  }

  return (
    <div className="single-quiz">
      <h1>{quest.title}</h1>
      {/* <div className="tags">
        {quest.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>  // * TODO: need to add tags to the backend */}
      <p className="content">{quest.description}</p>

      <div className="comment-section">
        <textarea placeholder="Напишіть свій коментар тут..."></textarea>
      </div>

      <div className="comments">
        {(quest.feedbacks || []).map((comment, index) => {
          if (!comment) return null;

          const [date, time] = formatDateTime(comment.createdAt);

          return (
            <div key={index} className="comment">
              <div className="comment-header">
                <div className="comment-author">
                  <div className="avatar">
                    <svg
                      className="avatar-placeholder"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <strong>{comment.user.userName}</strong>
                </div>
                <div className="comment-date">
                  <span>{date}</span> 
                  <span>{time}</span> 
                </div>
              </div>
              <div className="comment-text">{comment.comment}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SingleQuiz;

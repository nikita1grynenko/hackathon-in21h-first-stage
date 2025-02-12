import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './quiz-card.style.css';
import { type QuestSimplified } from '../../models/quest.model';
import secondsToTime from '../../utils/time-format';

const QuizCard: React.FC<QuestSimplified> = ({
  id,
  title,
  questScore,
  timeLimit,
  difficulty,
  topic,
}) => {
  const navigate = useNavigate();
  const tags = useMemo(() => {
    return [difficulty, topic];
  }, [difficulty, topic]);

  return (
    <div className="quiz-card" onClick={() => navigate(`/quiz/${id}`)}>
      <div className="quiz-card-header">
        <h3>{title}</h3>
        <span className="points">x {questScore} pts</span>
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="quiz-info">
        <div className="user-info">
          {/* <div className="avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={author} />
            ) : (
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
            )}
          </div> */}
          {/* <span className="author">{author}</span> */}
        </div>
        <span>•</span>
        <span>{secondsToTime(timeLimit)}</span>
      </div>
    </div>
  );
};

export default QuizCard;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './quiz-card.style.css';

// interface QuizCardProps {
//   id: number;
//   title: string;
//   tags: string[];
//   author: string;
//   date: string;
//   points: number;
//   avatar?: string;
// }

// const QuizCard: React.FC<QuizCardProps> = ({
//   id,
//   title,
//   tags,
//   author,
//   date,
//   points,
//   avatar,
// }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="quiz-card" onClick={() => navigate(`/quiz/${id}`)}>
//       <div className="quiz-card-header">
//         <h3>{title}</h3>
//         <span className="points">x {points} pts</span>
//       </div>
//       <div className="tags">
//         {tags.map((tag) => (
//           <span key={tag}>{tag}</span>
//         ))}
//       </div>
//       <div className="quiz-info">
//         <div className="user-info">
//           <div className="avatar">
//             {avatar ? (
//               <img src={avatar} alt={author} />
//             ) : (
//               <svg
//                 className="avatar-placeholder"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                 <circle cx="12" cy="7" r="4" />
//               </svg>
//             )}
//           </div>
//           <span className="author">{author}</span>
//         </div>
//         <span>•</span>
//         <span>{date}</span>
//       </div>
//     </div>
//   );
// };

// export default QuizCard;

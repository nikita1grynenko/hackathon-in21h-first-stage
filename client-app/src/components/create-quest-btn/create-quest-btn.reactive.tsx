import React from 'react';
import './create-quest-btn.style.css';

interface CreateQuestButtonProps {
  onClick: () => void;
}

const CreateQuestButton: React.FC<CreateQuestButtonProps> = ({ onClick }) => {
  return (
    <button className="create-quest-btn" onClick={onClick}>
      Створити квест
    </button>
  );
};

export default CreateQuestButton;

import { ChangeEvent, ElementRef, useEffect, useState } from "react";
import { QuestTask } from "../../models/quest-task.model";

import './quiz-task.style.css';

interface QuizTaskProps {
  index: number;
  task: QuestTask;
  onSaveOption: (option: Record<string, string[]>) => void;
}

interface QuizTaskState {
  checkboxes: string[];
  radio: string;
  inputField: string;
}

const QuizTask = ({task, index, onSaveOption}: QuizTaskProps) => {
  const [formData, setFormData] = useState<QuizTaskState>({
    radio: '',
    checkboxes: [],
    inputField: '',
  });
  const [isUpdated, setIsUpdated] = useState(false);
  
  const handleRadioChange = (event: ChangeEvent<ElementRef<'input'>>) => {
    setFormData((prev) => ({
      ...prev,
      radio: event.target.value,
    }));

    setIsUpdated(true);
  };

  const handleCheckboxChange = (event: ChangeEvent<ElementRef<'input'>>) => {
    const { value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      checkboxes: checked
        ? [...prev.checkboxes, value]
        : prev.checkboxes.filter((item) => item !== value),
    }));

    setIsUpdated(true);
  };

  const handleInputChange = (event: ChangeEvent<ElementRef<'input'>>) => {
    setFormData((prev) => ({
      ...prev,
      inputField: event.target.value,
    }));

    setIsUpdated(true);
  };

  useEffect(() => {
    const handleUpdate = () => {
      // const answer = task.questionType === 'Текстова відповідь' ? [formData.inputField] 
      //   : task.questionType === 'Одна правильна відповідь' ? [formData.radio]
      //   : formData.checkboxes;
  
      // const answerText = task.options?.find((option) => option.id === answer[0])?.text;
      const radioAnswers = task.options?.find((option) => option.id === formData.radio)?.text || '';
      const checkboxAnswers = task.options?.filter((option) => formData.checkboxes.includes(option.id)).map((option) => option.text);
      const textAnswers = task.questionType === 'Текстова відповідь' ? formData.inputField : '';

      onSaveOption({
        [task.id]: task.questionType === 'Одна правильна відповідь' ? [radioAnswers] : 
        task.questionType === 'Кілька правильних відповідей' ? checkboxAnswers : 
        [textAnswers]
      })
    };

    if (isUpdated) {
      handleUpdate();
      setIsUpdated(false);
    }
  }, [formData.checkboxes, formData.inputField, formData.radio, isUpdated, onSaveOption, task.id, task.options, task.questionType]);

  return (
    <form key={task.id} className="task-card">
      <h3 className="task-title">
        Питання {index + 1}: {task.title}
      </h3>
      <p className="task-description">{task.description}</p>

      {task.media?.length > 0 && (
        <div className="task-media">
          {task.media.map((media) => (
            <img key={media.id} src={media.url} alt={task.title} />
          ))}
        </div>
      )}

      <div className="task-options">
        {task.options?.map((option) => (
          <label key={option.id} className={["task-option", formData.checkboxes.includes(option.id) || formData.radio === option.id || formData.inputField.length > 0 ? 'active' : ''].join(' ')}>
            {task.questionType === 'Текстова відповідь' ? (
              <input 
                className="invisible-input" 
                type="text" 
                name={task.id} 
                placeholder="Введіть вашу відповідь тут..."
                value={formData.inputField}
                onChange={handleInputChange} 
              />
            ) : task.questionType === 'Одна правильна відповідь' ? (
              <input 
                className="invisible-input" 
                type="radio" 
                name={task.id} 
                value={option.id}
                checked={formData.radio === option.id} 
                onChange={handleRadioChange} 
              />
            ) : (
              <input 
                className="invisible-input" 
                type="checkbox" 
                name={task.id} 
                value={option.id}
                checked={formData.checkboxes.includes(option.id)} 
                onChange={handleCheckboxChange} 
              />
            )}
            {task.questionType !== 'Текстова відповідь' && option.text}
          </label>
        ))}
      </div>
    </form>
  );
};

export default QuizTask;

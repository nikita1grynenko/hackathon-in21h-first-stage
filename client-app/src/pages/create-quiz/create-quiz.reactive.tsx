import { useState } from 'react';
import './create-quiz.style.css';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Task {
  title: string;
  description: string;
  questionType: number;
  options: Option[];
}

interface Quest {
  title: string;
  description: string;
  questScore: number;
  timeLimit: number;
  tasks: Task[];
}

const CreateQuest: React.FC = () => {
  const [questData, setQuestData] = useState<Quest>({
    title: '',
    description: '',
    questScore: 0,
    timeLimit: 0,
    tasks: [],
  });

  const [newTask, setNewTask] = useState<Task>({
    title: '',
    description: '',
    questionType: 0,
    options: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTask = () => {
    setQuestData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));

    setNewTask({
      title: '',
      description: '',
      questionType: 0,
      options: [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/quests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(questData),
      });

      if (!response.ok) {
        throw new Error('Помилка при створенні квесту');
      }

      const result = await response.json();
      console.log('Квест створено:', result);

      setQuestData({
        title: '',
        description: '',
        questScore: 0,
        timeLimit: 0,
        tasks: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-quest-wrapper">
      <div className="create-quest-container">
        <h2>Створити квест</h2>
        <form onSubmit={handleSubmit} className="quest-form">
          <div className="form-group">
            <label>Назва квесту:</label>
            <input
              type="text"
              name="title"
              value={questData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Опис:</label>
            <textarea
              name="description"
              value={questData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Бали:</label>
            <input
              type="number"
              name="questScore"
              value={questData.questScore}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ліміт часу (сек):</label>
            <input
              type="number"
              name="timeLimit"
              value={questData.timeLimit}
              onChange={handleChange}
              required
            />
          </div>

          <hr />

          <h3>Додати завдання</h3>
          <div className="form-group">
            <label>Запитання:</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Опис завдання:</label>
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Тип запитання:</label>
            <select
              value={newTask.questionType}
              onChange={(e) =>
                setNewTask({ ...newTask, questionType: Number(e.target.value) })
              }
            >
              <option value={0}>Одна правильна відповідь</option>
              <option value={1}>Кілька правильних відповідей</option>
              <option value={2}>Текстова відповідь</option>
            </select>
          </div>

          <button type="button" onClick={addTask} className="btn">
            Додати завдання
          </button>

          <hr />

          <button type="submit" className="btn submit-btn">
            Створити квест
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuest;

import { ElementRef, useCallback, useState } from 'react';
import './create-quiz.style.css';
import CreateTask from './create-task.reactive';
import { v6 } from 'uuid';
import { QuestTask } from '../../models/quest-task.model';
import { Quest } from '../../models/quest.model';

const CreateQuest: React.FC = () => {
  const [tasks, setTasks] = useState<JSX.Element[]>([]);

  const [questData, setQuestData] = useState<Quest>({
    id: '',
    title: '',
    description: '',
    questScore: 0,
    timeLimit: 0,
    createdByUserId: '',
    createdByUser: null,
    questTasks: [],
    feedbacks: [],
  });

  const handleChange = (
    e: React.ChangeEvent<ElementRef<'input' | 'textarea'>>
  ) => {
    const { name, value } = e.target;
    setQuestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTask = useCallback((task: QuestTask) => {
    setQuestData((prev) => ({
      ...prev,
      questTasks: [...prev.questTasks.filter(questTask => questTask.id !== task.id), task],
    }));
  }, []);

  const handleRemoveTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.props.id !== taskId));
    setQuestData((prev) => ({
      ...prev,
      questTasks: prev.questTasks.filter((task) => task.id !== taskId),
    }));
  }, []);

  const addTask = useCallback(() => {
    const taskId = v6();
    setTasks((prevTasks) => [
      ...prevTasks,
      <CreateTask
        key={taskId}
        id={taskId}
        onSaveTask={handleCreateTask}
        onRemoveTask={handleRemoveTask}
      />,
    ]);
  }, [handleCreateTask, handleRemoveTask]);

  return (
    <div className="create-quest-wrapper">
      <div className="create-quest-container">
        <h2>Створити квест</h2>
        <form className="quest-form">
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
              value={questData.description || ''}
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

          <div className="tasks-group">{tasks}</div>
          <button className="btn" onClick={addTask} type="button">
            Додати завдання
          </button>

          <button type="submit" className="btn submit-btn">
            Створити квест
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuest;
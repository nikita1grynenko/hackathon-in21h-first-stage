import { ElementRef, useCallback, useEffect, useState } from 'react';
import './create-quiz.style.css';
import CreateTask from './create-task.reactive';
import { v6 } from 'uuid';
import { QuestTask } from '../../models/quest-task.model';
import { isQuestDificulty, isQuestTopic, QuestCreate, QuestDificultySchema, QuestTopicSchema } from '../../models/quest.model';
import { createQuest } from '../../middleware/quest.fetching';

const QuestAttempt: React.FC = () => {
  const [tasks, setTasks] = useState<JSX.Element[]>([]);

  const [questData, setQuestData] = useState<QuestCreate>({
    title: '',
    description: '',
    questScore: 0,
    timeLimit: 0,
    tasks: [],
    difficulty: 0,
    topic: 0,
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
      tasks: [...prev.tasks.filter(questTask => questTask.id !== task.id), task],
    }));
  }, []);

  const handleRemoveTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.props.id !== taskId));
    setQuestData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
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

  const handleSubmit = (e: React.MouseEvent<ElementRef<'button'>, MouseEvent>) => {
    e.preventDefault();
    
    createQuest(questData);
  };

  const convertDificulty = (dificulty: string) => {
    if (!isQuestDificulty(dificulty)) return -1;

    return QuestDificultySchema.indexOf(dificulty);
  };

  const convertTopic = (topic: string) => {
    if (!isQuestTopic(topic)) return -1;

    return QuestTopicSchema.indexOf(topic);
  };
  
  useEffect(() => {
    console.log(questData);
  }, [questData]);

  useEffect(() => {
    document.title = 'Create quiz — QUIZIII';
  }, []);

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
            <label>Складність:</label>
            <select
              value={questData.difficulty}
              onChange={(e) => isQuestDificulty(e.target.value) && setQuestData({ ...questData, difficulty: convertDificulty(e.target.value) })}
            >
              {QuestDificultySchema.map((questDificulty) => (
                <option key={questDificulty} value={questDificulty}>{questDificulty}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Тема:</label>
            <select
              value={QuestTopicSchema[questData.topic]}
              onChange={(e) => isQuestTopic(e.target.value) && setQuestData({ ...questData, topic: convertTopic(e.target.value) })}
            >
              {QuestTopicSchema.map((questTopic) => (
                <option key={questTopic} value={questTopic}>{questTopic}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Бали:</label>
            <input
              type="number"
              name="questScore"
              value={questData.questScore}
              onChange={(e) => setQuestData({ ...questData, questScore: Math.max(+e.target.value, 0) })}
              required
            />
          </div>

          <div className="form-group">
            <label>Ліміт часу (хв):</label>
            <input
              type="number"
              name="timeLimit"
              value={questData.timeLimit}
              onChange={(e) => setQuestData({ ...questData, timeLimit: Math.max(+e.target.value, 0) })}
              required
            />
          </div>
        </form>
        <hr />

        <div className="tasks-group">{tasks}</div>
        <button className="secondary btn" onClick={addTask} type="button">
          Додати завдання
        </button>

        <button type="button" className="btn submit-btn" onClick={handleSubmit}>
          Створити квест
        </button>
        
      </div>
    </div>
  );
};

export default QuestAttempt;
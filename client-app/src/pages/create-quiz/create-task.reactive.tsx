import { useCallback, useState } from "react";
import { isTaskType, QuestTask } from "../../models/quest-task.model";
import { v6 } from "uuid";
import CreateOption from "./create-option.reactive";
import { TaskOption } from "../../models/task-option.model";

interface CreateTaskProps {
  id: string;
  onSaveTask: (task: QuestTask) => void;
  onRemoveTask: (id: string) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({id, onSaveTask, onRemoveTask}) => {
  const [options, setOptions] = useState<JSX.Element[]>([]);
  const [questTaskData, setQuestTaskData] = useState<QuestTask>({
    id: id,
    questId: '',
    title: '',
    description: '',
    questionType: 'SingleChoice',
    options: [],
    media: [],
  });

  const handleCreateOption = useCallback((opt: Omit<TaskOption, "isCorrect">) => {
    setQuestTaskData((prev) => ({
      ...prev,
      questTasks: [...prev.options.filter(questTask => questTask.id !== opt.id), { ...opt, isCorrect: false }],
    }));
  }, []);

  const handleRemoveOption = useCallback((optionId: string) => {
    setOptions((prevOptions) => prevOptions.filter((opt) => opt.props.id !== optionId));
    setQuestTaskData((prev) => ({
      ...prev,
      questTasks: prev.options.filter((option) => option.id !== optionId),
    }));
  }, []);

  const addOption = useCallback(() => {
    const optionId = v6();
    setOptions((prevOptions) => [
      ...prevOptions,
      <CreateOption
        key={optionId}
        id={optionId}
        onSaveOption={handleCreateOption}
        onRemoveOption={handleRemoveOption}
      />,
    ]);
  }, [handleCreateOption, handleRemoveOption]);

  return (
    <section className="create-task">
      <div className="form-group">
        <button type="button" className="x-button" onClick={() => onRemoveTask(questTaskData.id)}>
          <svg height="16" width="16" viewBox="0 0 100 100">
            <line x1="0" y1="0" x2="100" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
            <line x1="100" y1="0" x2="0" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
          </svg>
        </button>
        <label>Запитання:</label>
        <input
          type="text"
          value={questTaskData.title}
          onChange={(e) => setQuestTaskData({ ...questTaskData, title: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Умова:</label>
        <textarea
          value={questTaskData.description || ''}
          onChange={(e) => setQuestTaskData({ ...questTaskData, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Тип запитання:</label>
        <select
          value={questTaskData.questionType}
          onChange={(e) => isTaskType(e.target.value) && setQuestTaskData({ ...questTaskData, questionType: e.target.value })}
        >
          <option value={"SingleChoice"}>Одна правильна відповідь</option>
          <option value={"MultipleChoice"}>Кілька правильних відповідей</option>
          <option value={"OpenAnswer"}>Текстова відповідь</option>
        </select>
      </div>

      <div className="options-group">{options}</div>
      <button className="btn" onClick={addOption} type="button">
        Додати варіант відповіді
      </button>

      <button type="button" className="secondary btn" onClick={() => onSaveTask(questTaskData)}>Зберегти завдання</button>
    </section>
  );
};

export default CreateTask;

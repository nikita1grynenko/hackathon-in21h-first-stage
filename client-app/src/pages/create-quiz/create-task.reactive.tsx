import { useCallback, useEffect, useState } from "react";
import { isTaskType, QuestTask, TaskTypeSchema } from "../../models/quest-task.model";
import { v6 } from "uuid";
import CreateOption from "./create-option.reactive";
import { TaskOption } from "../../models/task-option.model";
import CreateMedia from "./create-media.reactive";
import { TaskMedia } from "../../models/task-media.model";

interface CreateTaskProps {
  id: string;
  onSaveTask: (task: QuestTask) => void;
  onRemoveTask: (id: string) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({id, onSaveTask, onRemoveTask}) => {
  const [options, setOptions] = useState<JSX.Element[]>([]);
  const [allMedia, setAllMedia] = useState<JSX.Element[]>([]);

  const [questTaskData, setQuestTaskData] = useState<QuestTask>({
    id: id,
    questId: '',
    title: '',
    description: '',
    questionType: TaskTypeSchema[0],
    options: [],
    media: [],
  });

  const handleCreateOption = useCallback((opt: TaskOption) => {
    if (opt.isCorrect && questTaskData.options.find((option) => option.isCorrect)) {
      questTaskData.options.forEach((option) => option.isCorrect = false);
    }
    setQuestTaskData((prev) => ({
      ...prev,
      options: [...prev.options.filter(questTask => questTask.id !== opt.id), opt],
    }));
  }, [questTaskData.options]);

  const handleRemoveOption = useCallback((optionId: string) => {
    setOptions((prevOptions) => prevOptions.filter((opt) => opt.props.id !== optionId));
    setQuestTaskData((prev) => ({
      ...prev,
      questTasks: prev.options.filter((option) => option.id !== optionId),
    }));
  }, []);

  useEffect(() => {
    console.log(questTaskData);
  }, [questTaskData]);

  const addOption = useCallback(() => {
    const optionId = v6();

    const optionIdx = TaskTypeSchema.indexOf(questTaskData.questionType);
    console.log(optionIdx, questTaskData.options.find((option) => option.isCorrect)?.id);
    const optionCorrectPicker = <input 
      key={optionId} 
      name="answer" 
      type={ optionIdx !== 2 ? 'checkbox' : 'hidden' } 
      checked={questTaskData.options.find((option) => option.isCorrect)?.id === optionId}
      onChange={(e) => {
        if (optionIdx === 2) return;
        const isChecked = e.target.checked;
        setQuestTaskData((prev) => ({
          ...prev,
          options: prev.options.map((option) => {
            if (option.id === optionId) {
              option.isCorrect = isChecked;
            }
            return option;
          }),
        }));
      }}
    />;

    setOptions((prevOptions) => [
      ...prevOptions,
      <div className='task-wrapper' key={optionId}>
        <label>Чи це правильна відповідь?</label>
        {optionCorrectPicker}
        <CreateOption
          key={optionId+1}
          id={optionId}
          taskId={questTaskData.id}
          onSaveOption={handleCreateOption}
          onRemoveOption={handleRemoveOption}
        />
      </div>,
    ]);
  }, [handleCreateOption, handleRemoveOption, questTaskData.id, questTaskData.options, questTaskData.questionType]);

  const handleCreateMedia = useCallback((opt: TaskMedia) => {
    setQuestTaskData((prev) => ({
      ...prev,
      media: [...prev.media.filter(questTask => questTask.id !== opt.id), opt],
    }));
  }, []);

  const handleRemoveMedia = useCallback((mediaId: string) => {
    setAllMedia((prevMedias) => prevMedias.filter((opt) => opt.props.id !== mediaId));
    setQuestTaskData((prev) => ({
      ...prev,
      media: prev.media.filter((option) => option.id !== mediaId),
    }));
  }, []);

  const addMedia = useCallback(() => {
    const mediaId = v6();

    setAllMedia((prevMedias) => [
      ...prevMedias,
      <CreateMedia
        key={mediaId}
        id={mediaId}
        taskId={questTaskData.id}
        onSaveMedia={handleCreateMedia}
        onRemoveMedia={handleRemoveMedia}
      />,
    ]);
  }, [handleCreateMedia, handleRemoveMedia, questTaskData.id]);

  return (
    <section className="create-task">
      <button type="button" className="x-button" onClick={() => onRemoveTask(questTaskData.id)}>
        <svg height="16" width="16" viewBox="0 0 100 100">
          <line x1="0" y1="0" x2="100" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
          <line x1="100" y1="0" x2="0" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
        </svg>
      </button>
      
      <div className="form-group">
        <label>Запитання:</label>
        <input
          type="text"
          value={questTaskData.title}
          onChange={(e) => setQuestTaskData({ ...questTaskData, title: e.target.value })}
          required
          />
      </div>

      <div className="form-group">
        <label>Умова:</label>
        <textarea
          value={questTaskData.description || ''}
          onChange={(e) => setQuestTaskData({ ...questTaskData, description: e.target.value })}
          placeholder="Опціональне поле..."
        />
      </div>

      <div className="form-group">
        <label>Тип запитання:</label>
        <select
          value={questTaskData.questionType}
          onChange={(e) => isTaskType(e.target.value) && setQuestTaskData({ ...questTaskData, questionType: e.target.value })}
        >
          {TaskTypeSchema.map((taskType) => (
            <option key={taskType} value={taskType}>{taskType}</option>
          ))}
        </select>
      </div>

      <div className="medias-group">{allMedia}</div>
      <div className="options-group">{options}</div>

      <button className="btn" onClick={addMedia} type="button">Додати медіа</button>
      {((questTaskData.questionType !== 'Текстова відповідь') || (questTaskData.questionType === 'Текстова відповідь' && options.length === 0)) && (
        <button className="btn" onClick={addOption} type="button">Додати варіант відповіді</button>
      )}

      <button type="button" className="secondary btn" onClick={() => onSaveTask(questTaskData)}>Зберегти завдання</button>
    </section>
  );
};

export default CreateTask;

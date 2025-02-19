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

  const [radioOptionId, setRadioOptionId] = useState<Set<string>>(new Set<string>());

  const handleCreateOption = useCallback((opt: TaskOption) => {
    if (opt.isCorrect && questTaskData.options.find((option) => option.isCorrect)) {
      questTaskData.options.forEach((option) => option.isCorrect = false);
    }
    setQuestTaskData((prev) => ({
      ...prev,
      options: [...prev.options.filter(questTask => questTask.id !== opt.id), opt],
    }));
    onSaveTask(questTaskData);
  }, [onSaveTask, questTaskData]);

  const handleRemoveOption = useCallback((optionId: string) => {
    setOptions((prevOptions) => prevOptions.filter((opt) => opt.props.id !== optionId));
    setQuestTaskData((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== optionId),
    }));
  }, []);

  const addOption = useCallback(() => {
    const optionId = v6();

    const optionIdx = TaskTypeSchema.indexOf(questTaskData.questionType);
    const optionCorrectPicker = <input 
    key={radioOptionId.size} 
    id={optionId} 
    name="answer" 
    type={['radio', 'checkbox', 'hidden'][optionIdx]} 
    checked={radioOptionId.has(optionId)}
    onChange={(e) => {
      const isChecked = e.target.checked;
      setRadioOptionId((prev) => {
        const newSet = new Set(prev); // Створюємо новий Set
        console.log(prev, optionId);
        if (questTaskData.questionType === 'Одна правильна відповідь') {
          return isChecked ? new Set([optionId]) : prev;
        }
        if (questTaskData.questionType === 'Кілька правильних відповідей') {
          isChecked ? newSet.add(optionId) : newSet.delete(optionId);
        }
        return newSet; // Передаємо новий Set
      });
    }}
  />;

    setOptions((prevOptions) => [
      ...prevOptions,
      <CreateOption
        key={optionId+1}
        id={optionId}
        taskId={questTaskData.id}
        onSaveOption={handleCreateOption}
        onRemoveOption={handleRemoveOption}
      >
        <>
          {optionIdx === 2 ? null : <label>Чи це правильна відповідь?</label>}
          {optionCorrectPicker}
        </>
      </CreateOption>,
    ]);
  }, [handleCreateOption, handleRemoveOption, questTaskData.id, questTaskData.questionType, radioOptionId]);

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

  useEffect(() => {
    setQuestTaskData((prev) => ({
      ...prev,
      options: prev.options.map((option) => {
        document.getElementById(option.id)?.setAttribute('checked', radioOptionId.has(option.id).toString());
        return { ...option, isCorrect: radioOptionId.has(option.id) }
      }),
  }))}, [options, radioOptionId]);

  useEffect(() => {
    onSaveTask(questTaskData);
  }, [onSaveTask, questTaskData]);

  return (
    <section className="create-task">
      <form className="form-group">
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
            disabled={questTaskData.options.length > 0}
            onChange={(e) => isTaskType(e.target.value) && setQuestTaskData({ ...questTaskData, questionType: e.target.value })}
          >
            {TaskTypeSchema.map((taskType) => (
              <option key={taskType} value={taskType}>{taskType}</option>
            ))}
          </select>
        </div>

        <div className="medias-group">{allMedia}</div>
        <div className="options-group">{options}</div>

        <button className="secondary btn" onClick={addMedia} type="button">Додати медіа</button>
        {((questTaskData.questionType !== 'Текстова відповідь') || (questTaskData.questionType === 'Текстова відповідь' && options.length === 0)) && (
          <button className="secondary btn" onClick={addOption} type="button">Додати варіант відповіді</button>
        )}
      </form>
    </section>
  );
};

export default CreateTask;

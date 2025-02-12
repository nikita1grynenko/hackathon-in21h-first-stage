import { useState } from "react";
import { TaskOption } from "../../models/task-option.model";

interface CreateOptionProps {
  id: string;
  taskId: string;
  onSaveOption: (option: TaskOption) => void;
  onRemoveOption: (id: string) => void;
}

const CreateOption: React.FC<CreateOptionProps> = ({id, taskId, onSaveOption, onRemoveOption}) => {
  const [questOptionData, setQuestOptionData] = useState<TaskOption>({
    id: id,
    taskId: taskId,
    text: '',
    isCorrect: false,
  });

  return (
    <section className="create-option">
      <button type="button" className="x-button" onClick={() => onRemoveOption(questOptionData.id)}>
        <svg height="16" width="16" viewBox="0 0 100 100">
          <line x1="0" y1="0" x2="100" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
          <line x1="100" y1="0" x2="0" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
        </svg>
      </button>

      <div className="form-group">
        <label>Запитання:</label>
        <input
          type="text"
          value={questOptionData.text}
          onChange={(e) => setQuestOptionData({ ...questOptionData, text: e.target.value })}
          required
        />
      </div>

      <button type="button" className="secondary btn" onClick={() => onSaveOption(questOptionData)}>Зберегти варіант відповіді</button>
    </section>
  );
};

export default CreateOption;
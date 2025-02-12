import { useEffect, useState } from "react";
import { TaskOption } from "../../models/task-option.model";

interface CreateOptionProps {
  id: string;
  taskId: string;
  onSaveOption: (option: TaskOption) => void;
  onRemoveOption: (id: string) => void;
  children?: string | JSX.Element | JSX.Element[] | null;
}

const CreateOption: React.FC<CreateOptionProps> = ({id, taskId, children, onSaveOption, onRemoveOption}) => {
  const [questOptionData, setQuestOptionData] = useState<TaskOption>({
    id: id,
    taskId: taskId,
    text: '',
    isCorrect: false,
  });

  useEffect(() => {
    onSaveOption(questOptionData);
  }, [onSaveOption, questOptionData]);

  return (
    <section className="create-option">
      <button type="button" className="x-button" onClick={() => onRemoveOption(questOptionData.id)}>
        <svg height="16" width="16" viewBox="0 0 100 100">
          <line x1="0" y1="0" x2="100" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
          <line x1="100" y1="0" x2="0" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
        </svg>
      </button>

      <label>Варіант відповіді:</label>
      <input
        type="text"
        value={questOptionData.text}
        onChange={(e) => setQuestOptionData({ ...questOptionData, text: e.target.value })}
        required
      />
      {children}
  </section>
  );
};

export default CreateOption;
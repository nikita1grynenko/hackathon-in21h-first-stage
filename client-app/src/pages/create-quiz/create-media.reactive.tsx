import { useEffect, useState } from "react";
import { isMediaType, MediaTypeSchema, TaskMedia } from "../../models/task-media.model";

interface CreateMediaProps {
  id: string;
  taskId: string;
  onSaveMedia: (media: TaskMedia) => void;
  onRemoveMedia: (id: string) => void;
}

const CreateMedia: React.FC<CreateMediaProps> = ({id, taskId, onSaveMedia, onRemoveMedia}) => {
  const [questMediaData, setQuestMediaData] = useState<TaskMedia>({
    id: id,
    taskId: taskId,
    url: "",
    mediaType: MediaTypeSchema[0],
  });
  
  useEffect(() => {
    onSaveMedia(questMediaData);
  }, [onSaveMedia, questMediaData]);

  return (
    <section className="create-media">
      <button type="button" className="x-button" onClick={() => onRemoveMedia(questMediaData.id)}>
        <svg height="16" width="16" viewBox="0 0 100 100">
          <line x1="0" y1="0" x2="100" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
          <line x1="100" y1="0" x2="0" y2="100" style={{ stroke: "#000", strokeWidth: 12 }} />
        </svg>
      </button>

      <div className="form-group">
        <label>Посилання на медіа:</label>
        <input
          type="text"
          value={questMediaData.url}
          onChange={(e) => setQuestMediaData({ ...questMediaData, url: e.target.value })}
          required
        />
      </div>

      <label>Тип медіа:</label>
      <select
        value={questMediaData.mediaType}
        onChange={(e) => isMediaType(e.target.value) && setQuestMediaData({ ...questMediaData, mediaType: e.target.value })}
      >
        {MediaTypeSchema.map((mediaType) => (
          <option key={mediaType} value={mediaType}>{mediaType}</option>
        ))}
      </select>
    </section>
  );
};

export default CreateMedia;
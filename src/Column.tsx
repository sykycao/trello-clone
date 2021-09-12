import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { DragItem } from './DragItem';
import { addTask, moveList, moveTask, setDraggedItem } from './state/actions';
import { useAppState } from './state/AppStateContext';
import { ColumnContainer, ColumnTitle } from './styles';
import { isHidden } from './utils/isHidden';
import { useItemDrag } from './utils/useItemDrag';

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTaskByListId, dispatch } = useAppState();

  const tasks = getTaskByListId(id);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover(item: DragItem) {
      // If item is COLUMN
      if (item.type === 'COLUMN') {
        if (item.id === id) {
          return;
        }
        dispatch(moveList(item.id, id));
      } else {
        // If item is CARD
        if (item.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        dispatch(moveTask(item.id, null, item.columnId, id));
        dispatch(setDraggedItem({ ...item, columnId: id }));
      }
    },
  });

  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} columnId={id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};

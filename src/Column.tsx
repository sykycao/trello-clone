import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { addTask, moveList } from './state/actions';
import { useAppState } from './state/AppStateContext';
import { ColumnContainer, ColumnTitle } from './styles';
import { useItemDrag } from './utils/useItemDrag';

type ColumnProps = {
  text: string;
  id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
  const { draggedItem, getTaskByListId, dispatch } = useAppState();
  const tasks = getTaskByListId(id);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return;
        }
      }
      dispatch(moveList(draggedItem.id, id));
    },
  });

  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  drag(drop(ref));

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};

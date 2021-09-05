import { createContext, Dispatch, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { DragItem } from '../DragItem';
import { Action } from './actions';
import { AppState, appStateReducer } from './appStateReducer';

type Task = {
  id: string;
  text: string;
};

type List = {
  id: string;
  text: string;
  tasks: Task[];
};

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTaskByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c1', text: 'Learn TypeScript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c2', text: 'Begin to use static typing' }],
    },
  ],
  draggedItem: null,
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);

  const { draggedItem, lists } = state;
  const getTaskByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTaskByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

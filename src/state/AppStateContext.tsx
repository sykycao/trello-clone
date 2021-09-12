import { createContext, Dispatch, useContext, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { save } from '../api';
import { DragItem } from '../DragItem';
import { withInitialState } from '../withInitialState';
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

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    useEffect(() => {
      save(state);
    }, [state]);

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
  }
);

export const useAppState = () => {
  return useContext(AppStateContext);
};

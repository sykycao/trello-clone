import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { AppStateProvider } from './state/AppStateContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

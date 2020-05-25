import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { TodoStateContext } from './TodoStateContext';
import { TodoDispatchContext } from './TodoDispatchContext';

import TodoForm from './TodoForm';
import TodoViewer from './TodoViewer';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.header`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: fuchsia;
`;

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  date: moment.Moment;
}

type Action =
  | { type: 'INIT'; arr: Todo[] }
  | { type: 'ADD'; todo: Todo }
  | { type: 'SORT'; arr: Todo[] }
  | { type: 'DELETE'; id: string }
  | { type: 'UPDATE'; id: string, task: string; isCompleted: boolean };

type State = Todo[];

const updateLocalStorage = (todos: Todo[]) => {
  // Update localstorage with todos
  const update = JSON.stringify(todos);
  window.localStorage.setItem("nextodo", update);
}

function todoReducer(state: State, action: Action) {
  if (action.type === 'INIT') {
    const todoArr = [...action.arr]
    updateLocalStorage(todoArr)
    return todoArr;
  } else if (action.type === 'ADD') {
    const newArr = state.concat(action.todo)
    updateLocalStorage(newArr)
    return newArr;
  } else if (action.type === 'UPDATE') {
    // Make a copy of current state
    const updated = [...state]
    // Find todo in arry
    const updateIndex = updated.findIndex(todo => todo.id === action.id)
    // Update completed for slected todo
    if(action.task !== undefined){
      updated[updateIndex].task = action.task
    }
    if(action.isCompleted !== undefined){
      updated[updateIndex].completed = action.isCompleted
    }
    
    updateLocalStorage(updated)
    return updated;
  } else if (action.type === 'SORT') {
    return state
  } else if (action.type === 'DELETE') {
    return state;
  } else {
    return state
  }
}

const App: React.FC = () => {
  const initialTodoArr: Todo[] = []
  const [todos, dispatch] = useReducer(todoReducer, initialTodoArr);

  useEffect(() => {
    // Check localstorage for todo list
    const arr = window.localStorage.getItem("nextodo");
    // If todo list exists dispatch else create empty todo list
    arr && dispatch({ type: "INIT", arr: JSON.parse(arr) })
    // : window.localStorage.setItem("nextodo", JSON.stringify([]));
  }, []);

  return (
    <Container className="App">
      <Header className="App-header">
        <Title>NexTodo</Title>
      </Header>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoStateContext.Provider value={todos}>
          <TodoViewer />
          <TodoForm />
        </TodoStateContext.Provider>
      </TodoDispatchContext.Provider>
    </Container>
  );
};

export default App;

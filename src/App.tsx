import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import moment from "moment";
import { TodoStateContext } from "./TodoStateContext";
import { TodoDispatchContext } from "./TodoDispatchContext";

import TodoForm from "./TodoForm";
import TodoViewer from "./TodoViewer";

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
  | { type: "INIT"; arr: Todo[] }
  | { type: "ADD"; todo: Todo }
  | { type: "COMPLETE"; id: string; isCompleted: boolean }
  | { type: "DELETE"; id: string }
  | { type: "UPDATE"; todo: Todo };

type State = Todo[];

function todoReducer(state: State, action: Action) {
  if(action.type === 'INIT'){
    return [...action.arr];
  } else if(action.type === 'ADD'){
    return state.concat(action.todo);
  }else if(action.type === 'UPDATE'){
    return state;
  }else if(action.type === 'COMPLETE'){
    // Make a copy of current state
    const updated = [...state]
    // Find todo in arry
    const updateIndex = updated.findIndex(todo => todo.id === action.id)
    // Update completed for slected todo
    updated[updateIndex].completed = action.isCompleted
    return updated;
  }else if(action.type === 'DELETE'){
    return state;
  }else {
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
  
  useEffect(() => {
    // Update localstorage with todolist whenever the todolist changes
    const update = JSON.stringify(todos);
    window.localStorage.setItem("nextodo", update);
  }, [todos]);

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

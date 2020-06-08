import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import moment from "moment";
import todoReducer from "./todoReducer";
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
  font-size: 40px;
`;

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  date: moment.Moment;
}

const App: React.FC = () => {
  const initialTodoArr: Todo[] = [];
  const [todos, dispatch] = useReducer(todoReducer, initialTodoArr);

  useEffect(() => {
    // Check localstorage for todo list
    const arr = window.localStorage.getItem("nextodo");
    // If todo list exists dispatch else create empty todo list
    arr && dispatch({ type: "INIT", arr: JSON.parse(arr) });
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

import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import {TodoStateContext} from "./TodoStateContext";
import {TodoDispatchContext} from "./TodoDispatchContext";

import TodoForm from "./TodoForm";

const Container = styled.div`
  width: 100%;
  background: lightgrey;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

type Action =
  | { type: "INIT"; arr: object[] }
  | { type: "ADD"; todo: Todo }
  | { type: "COMPLETE"; id: string }
  | { type: "DELETE"; id: string }
  | { type: "UPDATE"; todo: Todo };

interface Todo {
  id: string;
  index: number;
  title: string;
  task: string;
  completed: boolean;
}

type State = Array<object>;

function todoReducer(state: State, action: Action) {
  switch (action.type) {
    case "INIT":
      return [...state, ...action.arr];
    case "ADD":
      return state.concat(action.todo);
    case "UPDATE":
      return state;
    case "COMPLETE":
      return state;
    case "DELETE":
      return state;
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const arr = window.localStorage.getItem("nextodo");
    arr
      ? dispatch({ type: "INIT", arr: JSON.parse(arr) })
      : window.localStorage.setItem("nextodo", JSON.stringify([]));
  }, []);

  useEffect(() => {
    const update = JSON.stringify(todos);
    window.localStorage.setItem('nextodo', update)
  },[todos])

  return (
    <Container className="App">
      <Header className="App-header">
        <Title>NexTodo</Title>
      </Header>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoStateContext.Provider value={todos}>
          <TodoForm />
        </TodoStateContext.Provider>
      </TodoDispatchContext.Provider>
    </Container>
  );
};

export default App;

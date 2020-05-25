import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import TodoCard from "./TodoCard";
import moment from "moment";
import { TodoStateContext } from "./TodoStateContext";

const Viewer = styled.div``;

const TodoViewer = () => {
  const state = useContext(TodoStateContext);
  const [todoCards, setTodoCards] = useState<object[]>([])

  const generateTodoList = () => {
    // Create array of todo cards 
    return state ? state.map((todo: any, index: number, fullArr: object[]) =>
      <TodoCard key={todo.id} {...todo} index={index} fullArr={fullArr} />
    ) : []
  }

  useEffect(() => {
    // Send todos to create new cards anytime the list is updated
    setTodoCards(generateTodoList())
  }, [state])

  return (
    <Viewer>
      {todoCards}
    </Viewer>
  );
};

export default TodoViewer;

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import TodoCard from "./TodoCard";
import moment from "moment";
import { TodoStateContext } from "./TodoStateContext";

const Viewer = styled.div`
  width: 70%;
  height: 80%;
  margin-bottom: 25px;
  overflow-x: hidden; 
  overflow-y: scroll;
`;

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  date: moment.Moment;
}

const TodoViewer = () => {
  const state = useContext(TodoStateContext);
  const [todoCards, setTodoCards] = useState<object[]>([])

  const generateTodoList = () => {
    const todoArr = [...state]
    // Sort array with completed tasks at the bottom
    const sortedArr= todoArr.sort((a, b) => 
      Number(a.completed)-Number(b.completed)
    )
    
    // Create array of todo cards 
    return state ? sortedArr.map((todo: any, index: number, fullArr: object[]) =>
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

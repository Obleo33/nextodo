import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import TodoCard from "./TodoCard";
import moment from "moment";
import TodoSearch from './TodoSearch'
import { TodoStateContext } from "./TodoStateContext";

const Viewer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  height: 80%;
  margin-bottom: 25px;
  `;

const CardContainer = styled.div`
  height: 95%;
  width: 100%;
  overflow-x: hidden; 
  overflow-y: scroll;
`

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  date: moment.Moment;
}

const TodoViewer = () => {
  const state = useContext(TodoStateContext);
  const [view, setView] = useState<Todo[]>(state)
  const [todoCards, setTodoCards] = useState<object[]>([])
  const [search, setSearch] = useState<string>('')

  // Update view any time the todo array changes
  useEffect(() => {
    setSearch('')
    setView(state)
  },[state])

  useEffect(() => {
    const generateTodoList = () => {
      const todoArr = [...view]
      // Sort array with completed tasks at the bottom
      const sortedArr = todoArr.sort((a, b) =>
        Number(a.completed) - Number(b.completed)
      )
      // Create array of todo cards 
      return state ? sortedArr.map((todo: any, index: number, fullArr: object[]) =>
        <TodoCard key={todo.id} {...todo} index={index} fullArr={fullArr} />
      ) : []
    }
    // Send todos to create new cards anytime the list is updated
    setTodoCards(generateTodoList())
  }, [view])

  return (
    <Viewer>
      <TodoSearch search={search} setSearch={setSearch} setView={setView}/>
      <CardContainer>
      {todoCards}
      </CardContainer>
    </Viewer>
  );
};

export default TodoViewer;

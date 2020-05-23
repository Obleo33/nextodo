import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TodoDispatchContext } from "./TodoDispatchContext";

const Form = styled.form``;

const TodoInput = styled.input``;

const Submit = styled.button``;

interface Props {
  dispatch: () => void;
}

const TodoForm = () => {
  const [todo, setTodo] = useState<string>("");
  const dispatch = useContext(TodoDispatchContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({ type: "ADD", todo: { id: "1", task: todo } })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TodoInput
        type="text"
        placeholder="input your todo item"
        value={todo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setTodo(e.target.value)
        }
      />
      <Submit
        type="submit"
        onClick={handleSubmit}
      />
    </Form>
  );
};

export default TodoForm;

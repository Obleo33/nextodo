import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TodoDispatchContext } from "./TodoDispatchContext";
import moment from 'moment'
import { Z_STREAM_ERROR } from "zlib";

const shortid = require('shortid');

const Form = styled.form``;

const TodoInput = styled.input``;

const Submit = styled.button``;

const Error = styled.div``

interface Props {
  dispatch: () => void;
}

const TodoForm = () => {
  const [task, setTask] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false)

  const dispatch = useContext(TodoDispatchContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task && title){
      const date = moment()
      dispatch({ type: "ADD", todo: { id: shortid.generate(), title, task, completed: false, date } })
      setTitle('')
      setTask('')
      setError(false)
    } else {
      setError(true)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TodoInput
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setTitle(e.target.value)
        }
      />
      <TodoInput
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setTask(e.target.value)
        }
      />
      <Submit
        type="submit"
        onClick={handleSubmit}
        value="Submit"
      />
      {error && <Error> Please enter a value for title and task before submitting</Error>}
    </Form>
  );
};

export default TodoForm;

import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TodoDispatchContext } from "./TodoDispatchContext";
import moment from "moment";

const shortid = require("shortid");

const FormContainer = styled.div`
  width: 70%;
  text-align: center;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TodoInput = styled.input`
  width: 100%;
`;

const Submit = styled.button`
  width: 150px;
  margin-left: 20px;
`;

const Error = styled.div`
  margin-top: 10px;
`;

interface Props {
  dispatch: () => void;
}

const TodoForm = () => {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const dispatch = useContext(TodoDispatchContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task) {
      const date = moment();
      dispatch({
        type: "ADD",
        todo: { id: shortid.generate(), task, completed: false, date },
      })
      setTask("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <TodoInput
          type="text"
          placeholder="Todo"
          value={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setTask(e.target.value)
          }
        />
        <Submit type="submit" onClick={handleSubmit}>Submit</Submit>
      </Form>
      {error && (
        <Error>
          Please enter a value for todo before submitting
        </Error>
      )}
    </FormContainer>
  );
};

export default TodoForm;

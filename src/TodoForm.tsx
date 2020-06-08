import React, { useContext } from "react";
import styled from "styled-components";
import { TodoDispatchContext } from "./TodoDispatchContext";
import moment from "moment";

const shortid = require("shortid");

const FormContainer = styled.div`
  width: 70%;
  max-width: 700px;
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
Error.displayName = 'TodoError'

interface Props {
  dispatch: () => void;
}

const TodoForm = () => {
  const [task, setTask] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

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
      <Form id='todo-form' onSubmit={handleSubmit}>
        <TodoInput
          id='todo-input'
          type="text"
          placeholder="Todo"
          value={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setTask(e.target.value)
          }
        />
        <Submit id='todo-submit' type="submit" onClick={handleSubmit}>Submit</Submit>
      </Form>
      {error && (
        <Error id='todo-error'>
          Please enter a value for todo before submitting
        </Error>
      )}
    </FormContainer>
  );
};

export default TodoForm;

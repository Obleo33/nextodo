import React, { useReducer } from "react";
import TodoViewer from "./TodoViewer";
import todoReducer from "./todoReducer";
import { TodoStateContext } from "./TodoStateContext";
import { TodoDispatchContext } from "./TodoDispatchContext";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  date: moment.Moment;
};

const contextValues: Todo[] = [
  {
    id: "IJeNMIjoa",
    task: "One",
    completed: false,
    date: "2020-06-07T19:07:27.814Z",
  },
  {
    id: "-mIkMkw6a",
    task: "Two",
    completed: false,
    date: "2020-06-07T19:07:29.462Z",
  },
  {
    id: "n3sINXXvp",
    task: "Three",
    completed: false,
    date: "2020-06-07T19:07:30.993Z",
  },
];

describe("<TodoViewer />", () => {
  it("renders", () => {
    const { getAllByTestId } = render(<TodoViewer />);
    const viewer = getAllByTestId("todoViewer");

    expect(viewer.length).toBe(1);
  });

  it("displays a list of todos", () => {
    const { getAllByTestId } = render(
      <TodoStateContext.Provider value={contextValues}>
        <TodoViewer />
      </TodoStateContext.Provider>
    );

    const todos = getAllByTestId("todos");

    expect(todos.length).toBe(3);
  });

  it("moves a card up when you click the up button", () => {
    const { findAllByTestId, getAllByTestId, getByText } = render(
      <TodoStateContext.Provider value={contextValues}>
        <TodoViewer />
      </TodoStateContext.Provider>
    );
    const todoArr = getAllByTestId("todos");
    const upButton = getAllByTestId("upButton");

    const index = todoArr.findIndex((todo) => {
      return todo.firstChild.firstChild.innerHTML === "Two";
    });

    // expect 2nd todo has the index 1
    expect(index).toEqual(1);

    // click the up button
    const secondUpButton = upButton[1];
    act(() => {
      fireEvent.click(secondUpButton);
    });

    // expect the 2nd todo has the index 0
    todoArr.forEach((todo) => {
      console.log(todo.firstChild.firstChild.innerHTML);
    });

    const todo = getByText("Two");
  });

  xit("moves a down up when you click the down button", () => {});

  xit("moves a card to the top when you click the top button", () => {});

  xit("moves a card to the bottom when you click the bottom button", () => {});

  xit("deletes a card when you click the delete button", () => {
    const { getAllByTestId } = render(
      <TodoStateContext.Provider value={contextValues}>
        <TodoViewer />
      </TodoStateContext.Provider>
    );

    const todos = getAllByTestId("todos");
    const deleteButtons = getAllByTestId("deleteButton");

    expect(todos.length).toBe(3);

    const firstDelete = deleteButtons[0];
    fireEvent.click(firstDelete);

    expect(todos.length).toBe(2);
  });

  xit("marks a card as complete when you check the completed checkbox", () => {});
});

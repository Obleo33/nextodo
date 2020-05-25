import {createContext} from 'react'
import moment from "moment";

interface Todo {
    id: string;
    task: string;
    completed: boolean;
    date: moment.Moment;
  }

const initialTodoArr: Todo[] = []

export const TodoStateContext = createContext(initialTodoArr);
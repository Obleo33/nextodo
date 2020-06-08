interface Todo {
  id: string;
  task: string;
  completed: boolean;
  date: moment.Moment;
}

type State = Todo[];

type Action =
  | { type: "INIT"; arr: Todo[] }
  | { type: "ADD"; todo: Todo }
  | { type: "DELETE"; id: string }
  | { type: "UPDATE"; id: string; task: string; isCompleted: boolean };

const updateLocalStorage = (todos: Todo[]) => {
  // Update localstorage with todos
  const update = JSON.stringify(todos);
  window.localStorage.setItem("nextodo", update);
};

function todoReducer(state: State, action: Action) {
  if (action.type === "INIT") {
    const todoArr = [...action.arr];
    updateLocalStorage(todoArr);
    return todoArr;
  } else if (action.type === "ADD") {
    const newArr = state.concat(action.todo);
    updateLocalStorage(newArr);
    return newArr;
  } else if (action.type === "UPDATE") {
    // Make a copy of current state
    const updated = [...state];
    // Find todo in arry
    const updateIndex = updated.findIndex((todo) => todo.id === action.id);
    // Update completed for slected todo
    if (action.task !== undefined) {
      updated[updateIndex].task = action.task;
    }
    if (action.isCompleted !== undefined) {
      updated[updateIndex].completed = action.isCompleted;
    }
    // Update local storage
    updateLocalStorage(updated);
    return updated;
  } else if (action.type === "DELETE") {
    // Duplicate state
    const newArr = [...state];
    // Locate todo
    const deleteIndex = newArr.findIndex((todo) => todo.id === action.id);
    // Remove to do from array
    newArr.splice(deleteIndex, 1);
    // Update locak storage
    updateLocalStorage(newArr);
    return newArr;
  } else {
    return state;
  }
}

export default todoReducer;

import {createContext} from 'react'

export const TodoStateContext = createContext<object[] | null>(null);
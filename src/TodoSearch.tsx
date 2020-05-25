import React,{useContext, useState} from 'react'
import styled from "styled-components";
import moment from "moment";
import { TodoStateContext } from "./TodoStateContext";
import { TodoDispatchContext } from "./TodoDispatchContext";

import { ReactComponent as Delete } from './assets/delete.svg';

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%
`

const Search = styled.input`
    width: 300px
`

const DeleteIcon = styled(Delete)`
    height: 10px;
    width: 10px;
`
const Button = styled.button`
  border: none;
  background: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-left: 10px;
`

interface Props {
    setView: React.Dispatch<React.SetStateAction<Todo[]>>
    search: string;
    setSearch : React.Dispatch<React.SetStateAction<string>>
}

type Todo = {
    id: string;
    task: string;
    completed: boolean;
    date: moment.Moment;
  }

const TodoSearch = (props: Props) => {
    const state = useContext(TodoStateContext);
    const dispatch = useContext(TodoDispatchContext);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('check');
        
        const searchVal = e.target.value
        props.setSearch(searchVal)

        const searchArr: Todo[] = state.filter((todo)=> todo.task.toLowerCase().includes(searchVal.toLowerCase()) )
        
        searchVal? props.setView(searchArr): props.setView(state)
    }

    const removeSearch = () => {
        props.setSearch('')
        props.setView(state)
    }
    return (
        <SearchContainer>
        <Search type='text' placeholder='Search' value={props.search} onChange={handleSearch}/>
        <Button onClick={removeSearch}><DeleteIcon/></Button>
        </SearchContainer>
    )
}

export default TodoSearch

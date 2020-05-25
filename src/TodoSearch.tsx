import React,{useContext} from 'react'
import styled from "styled-components";

const Search = styled.input``

interface Props {
    
}

const TodoSearch = (props: Props) => {
    return (
        <Search type='text' placeholder='Search'/>
    )
}

export default TodoSearch

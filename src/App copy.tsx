import React , { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import TodoForm from './TodoForm'

const Container = styled.div`
  width: 100%;
  background: lightgrey;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const Header = styled.header`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  color: fuchsia;

`
function App() {
  return (
    <Container className="App">
      <Header className="App-header">
        <Title>NexTodo</Title>
      </Header>
        <TodoForm/>
    </Container>
  );
}

export default App;
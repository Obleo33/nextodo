import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { TodoDispatchContext } from "./TodoDispatchContext";
import { ReactComponent as Up } from './assets/up.svg';
import { ReactComponent as Top } from './assets/top.svg';
import { ReactComponent as Down } from './assets/down.svg';
import { ReactComponent as Bottom } from './assets/bottom.svg';


const Card = styled.div``;
const Header = styled.header``;
const Title = styled.h2``;
const Date = styled.p``;
const Footer = styled.footer``;
const SortContainer = styled.div``;

const UpIcon = styled(Up)`
  height: 15px;
  width: 15px;
`
const TopIcon = styled(Top)`
  height: 15px;
  width: 15px;
`
const BottomIcon = styled(Bottom)`
  height: 15px;
  width: 15px;
`
const DownIcon = styled(Down)`
  height: 15px;
  width: 15px;
`

const Button = styled.button`
border: none;
background: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  id: string;
  task: string;
  completed: boolean;
  date: moment.Moment;
  index: number;
  fullArr: object[];
}

const TodoCard = ({ id, task, completed, date, index, fullArr }: Props) => {
  const dispatch = useContext(TodoDispatchContext);

  const dispatchArr = [...fullArr]

  const handleUp = () => {
    // Determine new index for todo 
    const upIndex = index > 0 ? index - 1 : 0
    // Reorder todo array with new index
    dispatchArr.splice(upIndex, 0, dispatchArr.splice(index, 1)[0])
    // Update todo state with new todo order
    dispatch({ type: 'INIT', arr: dispatchArr })
  }

  const handleTop = () => {
    // Remove todo from list and uinshift to beginning of list
    dispatchArr.unshift(dispatchArr.splice(index, 1)[0])
    // Update todo state with new todo order
    dispatch({ type: 'INIT', arr: dispatchArr })
  }

  const handleBottom = () => {
    // Remove todo from list and push to end of list
    dispatchArr.push(dispatchArr.splice(index, 1)[0])
    // Update todo state with new todo order
    dispatch({ type: 'INIT', arr: dispatchArr })
  }

  const handleDown = () => {
    // Determin new index for todo
    const downIndex = index < dispatchArr.length - 1 ? index + 1 : index
    // Reorder todo arr with new index
    dispatchArr.splice(downIndex, 0, dispatchArr.splice(index, 1)[0])
    // Update todo state with new todo order
    dispatch({ type: 'INIT', arr: dispatchArr })
  }

  return (
    <Card>
      <Header>
        <Title>{task}</Title>
        <Date>{moment(date).format('llll')}</Date>
      </Header>
      <Footer>
        <Button onClick={handleUp}><UpIcon /></Button>
        <Button onClick={handleTop}><TopIcon /></Button>
        <Button onClick={handleBottom}><BottomIcon /></Button>
        <Button onClick={handleDown}><DownIcon /></Button>
      </Footer>
    </Card>
  );
};

export default TodoCard;

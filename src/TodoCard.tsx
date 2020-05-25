import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { TodoDispatchContext } from "./TodoDispatchContext";

import { ReactComponent as Up } from './assets/up.svg';
import { ReactComponent as Top } from './assets/top.svg';
import { ReactComponent as Down } from './assets/down.svg';
import { ReactComponent as Bottom } from './assets/bottom.svg';
import { ReactComponent as Delete } from './assets/delete.svg';

interface cssProps {
  isCompleted: boolean;
}
const Card = styled.div<cssProps>`
  background-color: ${(props) =>
    props.isCompleted && 'lightgrey'};
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px orange;
  padding: 10px;
`;

const Header = styled.header`
  margin-left: 25px;
`;

const Completed = styled.input`
  position: absolute;
  top: 10;
  left: 10;
`

const Title = styled.h2<cssProps>`
  color: ${props => props.isCompleted && 'white'};
  font-size: 20px;
  font-weight: 700;
  margin: 0 5px 3px 0;
`;

const Date = styled.p<cssProps>`
  color: ${props => props.isCompleted && 'fuchsia'};
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  margin-bottom: 5px;
`;

const Footer = styled.footer`
  display: flex;
  margin-right: 25px;
`;

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
  margin-right: 10px;
`

const DeleteContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: 10px;
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
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const dispatch = useContext(TodoDispatchContext);
  const dispatchArr = [...fullArr]

  useEffect(() => {
    setIsCompleted(completed)
  }, [completed])

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

  const handleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked)
    dispatch({ type: 'UPDATE', id, isCompleted: e.target.checked })
  }

  const handleUpdate = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE', id, task: e.target.innerHTML })
  }

  const handleDelete = () => {
    dispatch({type: 'DELETE', id})
  }

  return (
    <Card isCompleted={isCompleted}>
      <Header>
        <Title isCompleted={isCompleted} contentEditable='true' onBlur={handleUpdate}>{task}</Title>
        <Date isCompleted={isCompleted}>{moment(date).format('llll')}</Date>
      </Header>
      <Completed type="checkbox" checked={isCompleted} onChange={(handleCompleted)
      } />
      <Footer>
        <Button onClick={handleUp}><UpIcon /></Button>
        <Button onClick={handleTop}><TopIcon /></Button>
        <Button onClick={handleBottom}><BottomIcon /></Button>
        <Button onClick={handleDown}><DownIcon /></Button>
      </Footer>
      <DeleteContainer><Button onClick={handleDelete}><DeleteIcon/></Button></DeleteContainer>
    </Card>
  );
};

export default TodoCard;

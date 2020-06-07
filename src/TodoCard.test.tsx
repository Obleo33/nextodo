import * as React from 'react';
import moment from "moment";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import TodoCard from './TodoCard';

configure({ adapter: new Adapter() });

const testCardProps = {
    id: 'abcde', 
    task: 'Test',
    completed: false,
    date: moment(), 
    index: 2,
    fullArr: [{},{},{}],
}

describe('<TodoCard />', ()=> { 
    const clickMock = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('renders', () => {
        const wrapper = mount(<TodoCard {...testCardProps}/>)
        const testCard = wrapper.find(TodoCard)
        expect(testCard).toHaveLength(1)
    })

    it('decreases the card index when the up button is pressed', () => {
        // const wrapper = mount(<TodoCard {...testCardProps} onClick={clickMock}/>)
        // const upButton = wrapper.find('UpIcon').parent()
        // console.log(upButton.props().onClick);
        
        // expect(upButton.props().onClick)
    })

    xit('increases the card index when the down button is pressed', () => {

    })

    xit('sets the card index to 0 when the top button is pressed', () => {

    })

    xit('sets the card index to end of the array when the bottom button is pressed', () => {

    })

    xit('sets completed when the completed checkbox is used', () => {

    })

    xit('updates the task when the task has been changed', () => {

    })

    xit('deletes the card index when the delete button is pressed', () => {

    })
})
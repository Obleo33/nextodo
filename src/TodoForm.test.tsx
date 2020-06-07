import * as React from 'react';
import {renderHook, act} from '@testing-library/react-hooks'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import TodoForm from './TodoForm';

configure({ adapter: new Adapter() });

describe('<Form />', () => {
    let wrapper: any
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState")
    useStateSpy.mockImplementation((init: string) => [init, setState]);

    beforeEach(() => {
       wrapper = mount(<TodoForm />)
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('renders the form', ()=> {
        expect(wrapper.find('form')).toHaveLength(1)
    })

    it('should display an error if you try to submit when there is no todo',() => {  
        const todoSubmit = wrapper.find('button')
        expect(todoSubmit).toHaveLength(1)
        let error: any
        error = wrapper.find('TodoError')
        expect(error).toHaveLength(0) 

        todoSubmit.simulate('click')
        
        error = wrapper.find('TodoError')        
        expect(error).toHaveLength(1)
    })

   xit('should erase input after you have submitted', ()=> {
        const {result} = renderHook(()=>TodoForm())
        console.log(result.current.handleSubmit);
        
        act(() =>{result.current.task})
        // const todoInput = wrapper.find('input')
        // const {result} = renderHook(()=> TodoForm())
        
        // result.current.handleSubmit()
        // todoInput.instance().value = "Test"
       
         
        // console.log(todoInput.props().onChange({target: {value: 'test'}}))
        // expect(todoInput.html).toHaveValue("test")
        
    })
})
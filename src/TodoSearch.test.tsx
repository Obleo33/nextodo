import * as React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import TodoSearch from './TodoSearch';

configure({ adapter: new Adapter() });

const testProps = {
    setView: jest.fn(),
    search: '',
    setSearch: jest.fn()
}

describe('<TodoSearch />', ()=> { 
    it('renders', () => {
        const wrapper = mount(<TodoSearch {...testProps}/>)
        expect(wrapper.find('input')).toHaveLength(1)
    })

    xit('allows the user to type in a search', () => {
        // NOTE: figgure out how to test useState
    })

    xit('filters the todo list as you type', () => {
        
    })

    xit('clears the search when you click the delete button', () => {

    })
})
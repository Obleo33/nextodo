import * as React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import TodoViewer from './TodoViewer';

configure({ adapter: new Adapter() });

describe('<TodoViewer />', ()=> { 
    it('renders', () => {
        const wrapper = mount(<TodoViewer />)
        expect(wrapper.find('Viewer')).toHaveLength(1)
    })

    xit('displays a list of todos', () => {
        // NOTE: Figgure out how to mock state
    })
})
import React from 'react';
import { shallow } from 'enzyme';
import App, {MyWrapperDiv} from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.text().includes('SomeWrapper div')).toBe(true);
  expect(wrapper.find(MyWrapperDiv).exists()).toBe(true);
});

it('has title method 1', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.text().includes('SomeWrapper div')).toBe(true);
});

it('has title method 2', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(MyWrapperDiv).exists()).toBe(true);
});



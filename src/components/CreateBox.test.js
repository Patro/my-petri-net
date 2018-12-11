import React from 'react';
import { Button, Input } from 'antd';
import { shallow } from 'enzyme';
import CreateBox from './CreateBox';

describe('CreateBox', () => {
  it('should render input box', () => {
    const wrapper = shallow(<CreateBox />);
    const input = wrapper.find(Input);
    expect(input).toHaveLength(1);
  });

  it('should render button as suffix', () => {
    const wrapper = shallow(<CreateBox />);
    const input = wrapper.find(Input);
    const suffix = shallow(input.prop('suffix')).instance();
    expect(suffix).toBeInstanceOf(Button);
  });

  it('should not call on create on text change', () => {
    const onCreate = jest.fn();

    const wrapper = shallow(<CreateBox onCreate={onCreate} />);
    const input = wrapper.find(Input);
    input.simulate('change', { target: { value: 'petri net name' }});

    expect(onCreate).not.toBeCalled();
  });

  it('should call on create with current text value on button click', () => {
    const onCreate = jest.fn();

    const wrapper = shallow(<CreateBox onCreate={onCreate} />);
    const input = wrapper.find(Input);
    input.simulate('change', { target: { value: 'first' }});
    input.simulate('change', { target: { value: 'second' }});
    const button = input.prop('suffix');
    button.props.onClick();

    expect(onCreate).toBeCalledWith('second');
  });
});

import React from 'react';
import { Button } from 'antd';
import { shallow } from 'enzyme';
import SimulatorToolbar from './SimulatorToolbar';

describe('SimulatorToolbar', () => {
  const getResetButton = (wrapper) => ( wrapper.find(Button).filter('[id="reset"]'));

  it('should render reset button', () => {
    const wrapper = shallow(<SimulatorToolbar />);
    const resetButton = getResetButton(wrapper);

    expect(resetButton.length).toBe(1);
  });

  it('should call on reset on click on reset button', () => {
    const onReset = jest.fn();

    const wrapper = shallow(<SimulatorToolbar onReset={onReset} />);
    const resetButton = getResetButton(wrapper);
    resetButton.props().onClick();

    expect(onReset).toBeCalled();
  });
});

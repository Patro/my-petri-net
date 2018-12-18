import React from 'react';
import { shallow } from 'enzyme';
import Delayed from './Delayed';

jest.useFakeTimers();

describe('Delayed', () => {
  it('should not render children on mount', () => {
    const wrapper = shallow(<Delayed><div className='test_div' /></Delayed>);

    expect(wrapper.find('.test_div').length).toBe(0);
  });

  it('should render children after timeout', () => {
    const wrapper = shallow(<Delayed><div className='test_div' /></Delayed>);

    jest.runAllTimers();

    expect(wrapper.find('.test_div').length).toBe(1);
  });
});

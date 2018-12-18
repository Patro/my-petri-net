import React from 'react';
import { Layout } from 'antd';
import { shallow } from 'enzyme';
import Delayed from './Delayed';
import GraphArea from './GraphArea';

describe('GraphArea', () => {
  it('should render content element', () => {
    const wrapper = shallow(<GraphArea />);
    const content = wrapper.find(Layout.Content);

    expect(content.length).toBe(1);
  });

  it('should render children', () => {
    const wrapper = shallow(<GraphArea><div className='test_div' /></GraphArea>);

    expect(wrapper.find('.test_div').length).toBe(1);
  });

  it('should render children inside of delayed component', () => {
    const wrapper = shallow(<GraphArea><div className='test_div' /></GraphArea>);

    expect(wrapper.find('.test_div').parent().is(Delayed)).toBe(true);
  });
});

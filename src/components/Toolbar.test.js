import React from 'react';
import { Layout } from 'antd';
import { shallow } from 'enzyme';
import Toolbar from './Toolbar';

describe('Toolbar', () => {
  it('should render header', () => {
    const wrapper = shallow(<Toolbar><div className="test_div" /></Toolbar>)
    const header = wrapper.find(Layout.Header);

    expect(header.length).toBe(1);
  });

  it('should set background color', () => {
    const wrapper = shallow(<Toolbar backgroundColor='#333' />)
    const header = wrapper.find(Layout.Header);

    expect(header.props().style).toEqual({ backgroundColor: '#333' });
  });

  it('should render children', () => {
    const wrapper = shallow(<Toolbar><div className="test_div" /></Toolbar>)
    const childDiv = wrapper.find('.test_div');

    expect(childDiv.length).toBe(1);
  });
});

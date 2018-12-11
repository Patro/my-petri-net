import React from 'react';
import { mount } from 'enzyme';
import StaticDiv from './StaticDiv';

describe('StaticDiv', () => {
  it('should render a div', () => {
    const wrapper = mount(<StaticDiv />);

    const div = wrapper.find('div');
    expect(div).toHaveLength(1);
  });

  it('should map div ref to div', () => {
    const ref = React.createRef();

    const wrapper = mount(<StaticDiv divRef={ref} />);

    const div = wrapper.find('div');
    expect(div.instance()).toEqual(ref.current);
  });

  it('should map props to div', () => {
    const wrapper = mount(<StaticDiv className='test' />);

    const div = wrapper.find('div');
    expect(div.prop('className')).toEqual('test');
  });

  it('should not render on prop change', () => {
    const render = jest.fn();

    const wrapper = mount(<StaticDiv />);
    wrapper.instance().render = render;
    wrapper.setProps({ test: 'test' });

    expect(render).not.toBeCalled();
  });
});

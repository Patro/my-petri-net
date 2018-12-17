import React from 'react';
import { Radio } from 'antd';
import { shallow } from 'enzyme';
import * as nodeType from '../constants/nodeTypes';
import EditorToolbar from './EditorToolbar';

describe('EditorToolbar', () => {
  it('should render radio group', () => {
    const wrapper = shallow(<EditorToolbar />);
    const radioGroup = wrapper.find(Radio.Group);

    expect(radioGroup.length).toBe(1);
  });

  it('should render radio button for transition', () => {
    const wrapper = shallow(<EditorToolbar />);
    const radioButtons = wrapper.find(Radio.Button).filter(`[value="${nodeType.TRANSITION}"]`);

    expect(radioButtons).toHaveLength(1);
  });

  it('should render radio button for place', () => {
    const wrapper = shallow(<EditorToolbar />);
    const radioButtons = wrapper.find(Radio.Button).filter(`[value="${nodeType.PLACE}"]`);

    expect(radioButtons).toHaveLength(1);
  });

  it('should map active node type to value of radio group', () => {
    const wrapper = shallow(<EditorToolbar activeNodeType={nodeType.PLACE} />);
    const radioGroup = wrapper.find(Radio.Group);

    expect(radioGroup.props().value).toEqual(nodeType.PLACE);
  });

  it('should call on node type change on change', () => {
    const onNodeTypeChange = jest.fn();

    const wrapper = shallow(<EditorToolbar onNodeTypeChange={onNodeTypeChange} />);
    const radioGroup = wrapper.find(Radio.Group);
    radioGroup.simulate('change', { target: { value: nodeType.TRANSITION }});

    expect(onNodeTypeChange).toBeCalledWith(nodeType.TRANSITION);
  });
});

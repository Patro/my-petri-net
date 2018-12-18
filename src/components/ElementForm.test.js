import React from 'react';
import { shallow } from 'enzyme';
import * as elementType from '../constants/elementTypes';
import * as nodeType from '../constants/nodeTypes';
import EdgeFormContainer from '../containers/EdgeFormContainer';
import PlaceFormContainer from '../containers/PlaceFormContainer';
import TransitionFormContainer from '../containers/TransitionFormContainer';
import ElementForm from './ElementForm';

describe('ElementForm', () => {
  it('should render edge form if element type is edge', () => {
    const element = {
      id: 'edge-id',
    }
    const wrapper = shallow(<ElementForm element={element} elementType={elementType.EDGE} />)
    const formContainer = wrapper.find(EdgeFormContainer);

    expect(formContainer.length).toBe(1);
  });

  it('should map edge id to form', () => {
    const element = {
      id: 'edge-id',
    }
    const wrapper = shallow(<ElementForm element={element} elementType={elementType.EDGE} />)
    const formContainer = wrapper.find(EdgeFormContainer);

    expect(formContainer.props().edgeId).toBe('edge-id');
  });

  it('should render place form if element type is node and node type is place', () => {
    const element = {
      id: 'place-id',
      type: nodeType.PLACE,
    }
    const wrapper = shallow(<ElementForm element={element} elementType={elementType.NODE} />)
    const formContainer = wrapper.find(PlaceFormContainer);

    expect(formContainer.length).toBe(1);
  });

  it('should map place id to form', () => {
    const element = {
      id: 'place-id',
      type: nodeType.PLACE,
    }
    const wrapper = shallow(<ElementForm element={element} elementType={elementType.NODE} />)
    const formContainer = wrapper.find(PlaceFormContainer);

    expect(formContainer.props().placeId).toBe('place-id');
  });

  it('should render transition form if element type is node and node type is transition', () => {
    const element = {
      id: 'transition-id',
      type: nodeType.TRANSITION,
    }
    const wrapper = shallow(<ElementForm element={element} elementType={elementType.NODE} />)
    const formContainer = wrapper.find(TransitionFormContainer);

    expect(formContainer.length).toBe(1);
  });

  it('should map transition id to form', () => {
    const element = {
      id: 'transition-id',
      type: nodeType.TRANSITION,
    }
    const wrapper = shallow(<ElementForm element={element} elementType={elementType.NODE} />)
    const formContainer = wrapper.find(TransitionFormContainer);

    expect(formContainer.props().transitionId).toBe('transition-id');
  });
});

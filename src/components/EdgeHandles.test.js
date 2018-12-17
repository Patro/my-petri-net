import React from 'react';
import { mount } from 'enzyme';
import edgeHandles from 'cytoscape-edgehandles';
import CytoscapeContext from '../contexts/CytoscapeContext';
import EdgeHandles from './EdgeHandles';

describe('EdgeHandles', () => {
  it('should use cytoscape context', () => {
    const cytoscapeContext = {
      edgehandles: jest.fn(),
    };

    const wrapper = mount(
      <CytoscapeContext.Provider value={cytoscapeContext}>
        <EdgeHandles />
      </CytoscapeContext.Provider>
    );
    const edgeHandles = wrapper.find(EdgeHandles);

    expect(edgeHandles.instance().context).toBe(cytoscapeContext);
  });

  it('should not fail if cy object context is undefined', () => {
    const cytoscapeContext = undefined;

    const wrapper = mount(
      <CytoscapeContext.Provider value={cytoscapeContext}>
        <EdgeHandles />
      </CytoscapeContext.Provider>
    );
    const edgeHandles = wrapper.find(EdgeHandles);

    expect(edgeHandles.instance().context).toBe(cytoscapeContext);
  });

  it('should add edge handles to cytoscape', () => {
    expect(edgeHandles).toBeCalled();
  });

  describe('initialization', () => {
    it('should initialize edgehandles on mount', () => {
      const edgehandlesInit = jest.fn();
      const cytoscapeContext = {
        edgehandles: edgehandlesInit,
      };

      mount(
        <CytoscapeContext.Provider value={cytoscapeContext}>
          <EdgeHandles />
        </CytoscapeContext.Provider>
      );

      expect(edgehandlesInit).toBeCalled();
    });

    it('should initialize edgehandles on update', () => {
      const edgehandlesInit = jest.fn();
      const cytoscapeContext = undefined;

      const wrapper = mount(
        <CytoscapeContext.Provider value={cytoscapeContext}>
          <EdgeHandles />
        </CytoscapeContext.Provider>
      );
      wrapper.setProps({ value: { edgehandles: edgehandlesInit } });

      expect(edgehandlesInit).toBeCalled();
    });

    it('should destroy existing edgehandles on update', () => {
      const edgehandlesDestroy = jest.fn();
      const edgehandlesInit = () => ({ destroy: edgehandlesDestroy });
      const cytoscapeContext = {
        edgehandles: edgehandlesInit,
      };

      const wrapper = mount(
        <CytoscapeContext.Provider value={cytoscapeContext}>
          <EdgeHandles />
        </CytoscapeContext.Provider>
      );
      wrapper.setProps({ value: { edgehandles: jest.fn() } });

      expect(edgehandlesDestroy).toBeCalled();
    });
  });
});

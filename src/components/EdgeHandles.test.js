import React from 'react';
import { mount } from 'enzyme';
import edgeHandles from 'cytoscape-edgehandles';
import CytoscapeContext from '../contexts/CytoscapeContext';
import EdgeHandles from './EdgeHandles';

const setupCytoscapeContext = (initFn) => ({
  edgehandles: initFn,
});

describe('EdgeHandles', () => {
  it('should use cytoscape context', () => {
    const cytoscapeContext = setupCytoscapeContext(jest.fn());

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
      const cytoscapeContext = setupCytoscapeContext(edgehandlesInit);

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
      wrapper.setProps({ value: setupCytoscapeContext(edgehandlesInit) });

      expect(edgehandlesInit).toBeCalled();
    });

    it('should destroy existing edgehandles on update', () => {
      const edgehandlesDestroy = jest.fn();
      const edgehandlesInit = () => ({ destroy: edgehandlesDestroy });
      const cytoscapeContext = setupCytoscapeContext(edgehandlesInit);

      const wrapper = mount(
        <CytoscapeContext.Provider value={cytoscapeContext}>
          <EdgeHandles />
        </CytoscapeContext.Provider>
      );
      wrapper.setProps({ value: setupCytoscapeContext(jest.fn()) });

      expect(edgehandlesDestroy).toBeCalled();
    });

    it('should set snap option', () => {
      const edgehandlesInit = jest.fn();
      const cytoscapeContext = setupCytoscapeContext(edgehandlesInit);

      mount(
        <CytoscapeContext.Provider value={cytoscapeContext}>
          <EdgeHandles snap={true} />
        </CytoscapeContext.Provider>
      );

      expect(edgehandlesInit.mock.calls[0][0]).toMatchObject({ snap: true });
    });
  });

  it('should forward edge params callback call', () => {
    const edgeParams = jest.fn();
    const edgehandlesInit = jest.fn();
    const cytoscapeContext = setupCytoscapeContext(edgehandlesInit);

    mount(
      <CytoscapeContext.Provider value={cytoscapeContext}>
        <EdgeHandles edgeParams={edgeParams} />
      </CytoscapeContext.Provider>
    );
    const options = edgehandlesInit.mock.calls[0][0];
    options.edgeParams({ id: () => 'node-a' }, { id: () => 'node-b' });

    expect(edgeParams).toBeCalledWith('node-a', 'node-b');
  });

  it('should call on add edge callback on complete', () => {
    const onAddEdge = jest.fn();
    const edgehandlesInit = jest.fn();
    const cytoscapeContext = setupCytoscapeContext(edgehandlesInit);

    mount(
      <CytoscapeContext.Provider value={cytoscapeContext}>
        <EdgeHandles onAddEdge={onAddEdge} />
      </CytoscapeContext.Provider>
    );
    const options = edgehandlesInit.mock.calls[0][0];
    options.complete({ id: () => 'node-a' }, { id: () => 'node-b' });

    expect(onAddEdge).toBeCalledWith('node-a', 'node-b');
  });
});

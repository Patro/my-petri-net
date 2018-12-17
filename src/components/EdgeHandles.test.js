import React, { Component } from 'react';
import { mount } from 'enzyme';
import CytoscapeContext from '../contexts/CytoscapeContext';
import EdgeHandles from './EdgeHandles';

describe('EdgeHandles', () => {
  it('should use cytoscape context', () => {
    const cytoscapeContext = {};

    const wrapper = mount(
      <CytoscapeContext.Provider value={cytoscapeContext}>
        <EdgeHandles />
      </CytoscapeContext.Provider>
    );
    const edgeHandles = wrapper.find(EdgeHandles);

    expect(edgeHandles.instance().context).toBe(cytoscapeContext);
  });
});

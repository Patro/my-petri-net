import React from 'react';
import cytoscape from 'cytoscape';
import { mount, shallow } from 'enzyme';
import CytoscapeContext from '../contexts/CytoscapeContext';
import GraphAnimation from './GraphAnimation';

const setupCytoscape = () => (
  cytoscape({
    elements: [
      {
        group: 'nodes',
        data: {
          id: 'node-a',
        },
        position: { x: 1, y: 1 },
      },
    ],
  })
);

describe('GraphAnimation', () => {
  it('should call play method on mount', () => {
    const cytoscapeContext = setupCytoscape();
    const play = jest.fn();
    const animation = jest.fn().mockImplementation(() => ({ play }));

    mount(
      <CytoscapeContext.Provider value={cytoscapeContext}>
        <GraphAnimation elementId='node-a' animation={animation} />
      </CytoscapeContext.Provider>
    );

    expect(play).toBeCalled();
  });

  it('should call cancel method on unmount', () => {
    const cytoscapeContext = setupCytoscape();
    const cancel = jest.fn();
    const animation = jest.fn().mockImplementation(() => ({ play: () => {}, cancel }));

    const wrapper = mount(
      <CytoscapeContext.Provider value={cytoscapeContext}>
        <GraphAnimation elementId='node-a' animation={animation} />
      </CytoscapeContext.Provider>
    );
    cancel.mockClear();
    wrapper.unmount();

    expect(cancel).toBeCalled();
  });
});

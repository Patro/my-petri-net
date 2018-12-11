import React from 'react';
import cytoscape from 'cytoscape';
import { mount } from 'enzyme';
import Graph from './Graph';
import StaticDiv from './StaticDiv';

jest.mock('cytoscape');

describe('Graph', () => {
  const getCytoscape = (wrapper) => wrapper.instance().cy;

  beforeEach(() => {
    cytoscape.mockImplementation((options) => ({
      options,
      container: () => ( options.container ),
      json: () => ( options.elements ),
      layout: (layout = undefined) => ( layout ? options.layout = layout : options.layout ),
      style: (style = undefined) => ( style ? options.style = style : options.style),
    }));
  });

  describe('initialization', () => {
    it('should set static div as container', () => {
      const wrapper = mount(<Graph elementsById={{}} />);

      const container = getCytoscape(wrapper).container();
      const innerDiv = wrapper.find(StaticDiv).children('div').instance();
      expect(container).toEqual(innerDiv);
    });

    it('should map elements by id prop to elements option', () => {
      const elementsById = {
        'element-1': {
          group: 'nodes',
        },
        'element-2': {
          group: 'edges',
        },
      }

      const wrapper = mount(<Graph elementsById={elementsById} />);

      const json = getCytoscape(wrapper).json();
      const mappedElements = [{ group: 'nodes' }, { group: 'edges' }];
      expect(json).toEqual(mappedElements);
    });

    it('should clone element params', () => {
      const elementsById = {
        'element-1': {
          group: 'nodes',
        },
      }

      const wrapper = mount(<Graph elementsById={elementsById} />);
      elementsById['element-1'].group = 'edges';

      const elementJson = getCytoscape(wrapper).json()[0];
      expect(elementJson.group).toEqual('nodes');
    });

    it('should set layout', () => {
      const layoutProp = {
        name: 'preset',
      };

      const wrapper = mount(<Graph layout={layoutProp} />);

      const layout = getCytoscape(wrapper).layout();
      expect(layout).toEqual(layoutProp);
    });

    it('should clone layout', () => {
      const layoutProp = {
        name: 'preset',
      };

      const wrapper = mount(<Graph layout={layoutProp} />);
      layoutProp.name = 'random';

      const layout = getCytoscape(wrapper).layout();
      expect(layout.name).toEqual('preset');
    });

    it('should set style', () => {
      const styleProp = [{
        selector: '*',
      }];

      const wrapper = mount(<Graph style={styleProp} />);

      const style = getCytoscape(wrapper).style();
      expect(style).toEqual(styleProp);
    });

    it('should clone style', () => {
      const styleProp = [{
        selector: '*',
      }];

      const wrapper = mount(<Graph style={styleProp} />);
      styleProp[0].selector = 'nodes';

      const style = getCytoscape(wrapper).style();
      expect(style[0].selector).toEqual('*');
    });
  });
});

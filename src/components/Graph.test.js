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
      container: jest.fn(() => ( options.container )),
      json: jest.fn(() => ( options.elements )),
      layout: jest.fn((layout = undefined) => ( layout ? options.layout = layout : options.layout )),
      style: jest.fn((style = undefined) => ( style ? options.style = style : options.style)),
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

  describe('update', () => {
    it('should update layout', () => {
      const initialLayout = {
        name: 'preset',
      };
      const updatedLayout = {
        name: 'random',
      };

      const wrapper = mount(<Graph layout={initialLayout} />);
      wrapper.setProps({ layout: updatedLayout });

      const layout = getCytoscape(wrapper).layout();
      expect(layout).toEqual(updatedLayout);
    });

    it('should clone given layout object', () => {
      const layoutProp = {
        name: 'present',
      };

      const wrapper = mount(<Graph />);
      wrapper.setProps({ layout: layoutProp });
      layoutProp.name = 'random';

      const layout = getCytoscape(wrapper).layout();
      expect(layout.name).toEqual('present');
    });

    it('should not update layout if object is the same as the one given on init', () => {
      const initialLayout = {
        name: 'preset',
      };

      const wrapper = mount(<Graph layout={initialLayout} />);
      wrapper.setProps({ layout: initialLayout, other: 'change' });

      expect(getCytoscape(wrapper).layout).not.toBeCalled();
    });

    it('should not update layout if object is the same as the one given on previous update', () => {
      const initialLayout = {
        name: 'preset',
      };
      const updatedLayout = {
        name: 'random',
      };

      const wrapper = mount(<Graph layout={initialLayout} />);
      wrapper.setProps({ layout: updatedLayout });
      wrapper.setProps({ layout: updatedLayout, other: 'change' });

      expect(getCytoscape(wrapper).layout.mock.calls.length).toBe(1);
    });

    it('should update style', () => {
      const initialStyle = [{
        selector: '*',
      }];
      const updatedStyle = [{
        selector: 'nodes',
      }];

      const wrapper = mount(<Graph style={initialStyle} />);
      wrapper.setProps({ style: updatedStyle });

      const style = getCytoscape(wrapper).style();
      expect(style).toEqual(updatedStyle);
    });

    it('should clone given style object', () => {
      const styleProp = [{
        selector: '*',
      }];

      const wrapper = mount(<Graph />);
      wrapper.setProps({ style: styleProp });
      styleProp[0].selector = 'nodes';

      const style = getCytoscape(wrapper).style();
      expect(style[0].selector).toEqual('*');
    });

    it('should not update style if object is the same as the one given on init', () => {
      const initialStyle = [{
        selector: '*',
      }];

      const wrapper = mount(<Graph style={initialStyle} />);
      wrapper.setProps({ style: initialStyle, other: 'change' });

      expect(getCytoscape(wrapper).style).not.toBeCalled();
    });

    it('should not update style if object is the same as the one given on previous update', () => {
      const initialStyle = [{
        selector: '*',
      }];
      const updatedStyle = [{
        selector: 'nodes',
      }];

      const wrapper = mount(<Graph style={initialStyle} />);
      wrapper.setProps({ style: updatedStyle });
      wrapper.setProps({ style: updatedStyle, other: 'change' });

      expect(getCytoscape(wrapper).style.mock.calls.length).toBe(1);
    });
  });
});

import React from 'react';
import cytoscape from 'cytoscape';
import { mount } from 'enzyme';
import * as elementTypes from '../constants/elementTypes';
import Graph from './Graph';
import StaticDiv from './StaticDiv';

jest.mock('cytoscape');

describe('Graph', () => {
  const getCytoscape = (wrapper) => wrapper.instance().cy;

  beforeEach(() => {
    const mockElement = (cy, params) => {
      const el = {
        _addEventFields: (event) => ({ target: el, ...event }),
        _json: () => ( cy._json[cy._jsonIndex(el.id())] ),
        data: jest.fn(() => ( el._json().data )),
        group: jest.fn(() => ( params.group )),
        emit: jest.fn((event) => ( cy.emit(el._addEventFields(event)) )),
        id: jest.fn(() => ( params.data.id )),
        json: jest.fn((json) => ( json ? cy._json[cy._jsonIndex(el.id())] = json : el._json )),
        position: jest.fn(() => ( el._json.position )),
        remove: jest.fn(() => ( cy._elements = cy._elements.filter(el => el !== this) )),
      };
      return el;
    };
    const mockCollection = (elements) => ({
      length: elements.length,
      emit: (event) => elements.forEach(element => element.emit(event)),
      first: () => elements[0],
      json: (json) => elements.forEach(element => element.json(json)),
      remove: () => elements.forEach(element => element.remove()),
    });
    cytoscape.mockImplementation((options) => {
      const cy = {
        _addEventFields: (event) => ({ cy, target: cy, ...event }),
        _container: options.container,
        _eventHandlers: {},
        _json: options.elements,
        _jsonIndex: (id) => cy._json.findIndex(json => json.data.id === id),
        _layout: options.layout,
        _style: options.style,
        add: jest.fn((json) => {
          cy._json.push(json);
          cy._elements.push(mockElement(cy, json));
        }),
        container: jest.fn(() => ( cy._container )),
        elements: jest.fn((selector) => { // expects selector with id, e.g. #petri-net-1
          const id = selector.substring(1);
          return mockCollection(cy._elements.filter(el => el.id() === id));
        }),
        emit: jest.fn((event) => {
          if (cy._eventHandlers[event.type] === undefined) {
            return;
          }
          cy._eventHandlers[event.type].forEach(handler => handler(cy._addEventFields(event)));
        }),
        json: jest.fn(() => ( cy._json )),
        layout: jest.fn((layout = undefined) => ( layout ? cy._layout = layout : cy._layout )),
        on: jest.fn((type, callback) => {
          if (cy._eventHandlers[type] === undefined) {
            cy._eventHandlers[type] = [];
          }
          cy._eventHandlers[type].push(callback);
        }),
        style: jest.fn((style = undefined) => ( style ? cy._style = style : cy._style)),
      };
      cy._elements = options.elements.map(element => mockElement(cy, element));
      return cy;
    });
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

  describe('update options', () => {
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

  describe('update elements', () => {
    describe('with added element params', () => {
      it('should add new elements', () => {
        const initialElements = {};
        const updatedElements = {
          'element-id': {
            data: { id: 'element-id' },
          },
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        wrapper.setProps({ elementsById: updatedElements });

        expect(getCytoscape(wrapper).add).toBeCalledWith({ data: { id: 'element-id' } });
      });

      it('should clone given new element', () => {
        const initialElements = {};
        const updatedElements = {
          'element-id': {
            data: { id: 'element-id' },
          },
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        wrapper.setProps({ elementsById: updatedElements });
        updatedElements['element-id'].data.id = 'other-id';

        const element = getCytoscape(wrapper).json()[0];
        expect(element.data.id).toEqual('element-id');
      });

      it('should update params if element was created by a third party', () => {
        const initialElements = {};
        const thirdPartyElement = { data: { id: 'element-id', label: 'A' } };
        const updatedElements = {
          'element-id': {
            data: { id: 'element-id', label: 'B' },
          },
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        getCytoscape(wrapper).add(thirdPartyElement);
        wrapper.setProps({ elementsById: updatedElements });

        const element = getCytoscape(wrapper).json()[0];
        expect(element.data.label).toEqual('B');
      });
    });

    describe('with removed element params', () => {
      it('should remove former elements', () => {
        const initialElements = {
          'element-id': {
            data: { id: 'element-id' },
          },
        };
        const updatedElements = {};

        const wrapper = mount(<Graph elementsById={initialElements} />);
        const el = getCytoscape(wrapper).elements('#element-id').first();
        wrapper.setProps({ elementsById: updatedElements });

        expect(el.remove).toBeCalled();
      });

      it('should not fail if element was removed by a third party', () => {
        const initialElements = {};
        const updatedElements = {
          'element-id': {
            data: { id: 'element-id', label: 'B' },
          },
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        getCytoscape(wrapper).elements('element-id').remove();
        wrapper.setProps({ elementsById: updatedElements });
      });
    });

    describe('with updated element params', () => {
      it('should update existing elements', () => {
        const initialElements = {
          'element-id': {
            data: { id: 'element-id', label: 'A' },
          },
        };
        const updatedElements = {
          'element-id': {
            data: { id: 'element-id', label: 'B' },
          },
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        wrapper.setProps({ elementsById: updatedElements });

        const el = getCytoscape(wrapper).elements('#element-id').first();
        expect(el.json).toBeCalledWith({ data: { id: 'element-id', label: 'B' } });
      });

      it('should not update element if object is the same as the one given on init', () => {
        const element = {
          data: { id: 'element-id', label: 'A' },
        };
        const initialElements = {
          'element-id': element,
        };
        const updatedElements = {
          'element-id': element,
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        wrapper.setProps({ elementsById: updatedElements, other: 'change' });

        const el = getCytoscape(wrapper).elements('#element-id').first();
        expect(el.json).not.toBeCalled();
      });

      it('should not update element if object is the same as the one given on previous update', () => {
        const initialElements = {
          'element-id': {
            data: { id: 'element-id', label: 'A' },
          },
        };
        const element = {
          data: { id: 'element-id', label: 'B' },
        };
        const updatedElements1 = {
          'element-id': element
        };
        const updatedElements2 = {
          'element-id': element
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        wrapper.setProps({ elementsById: updatedElements1 });
        wrapper.setProps({ elementsById: updatedElements2, other: 'change' });

        const el = getCytoscape(wrapper).elements('#element-id').first();
        expect(el.json.mock.calls.length).toBe(1);
      });

      it('should clone element params', () => {
        const initialElements = {
          'element-id': {
            data: { id: 'element-id', label: 'A' },
          },
        };
        const updatedElements = {
          'element-id': {
            data: { id: 'element-id', label: 'B' },
          },
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        wrapper.setProps({ elementsById: updatedElements });
        updatedElements['element-id'].data.label = 'C';

        const el = getCytoscape(wrapper).elements('#element-id').first();
        expect(el.data().label).toEqual('B');
      });

      it('should not fail if element was removed by a third party', () => {
        const initialElements = {
          'element-id': {
            data: { id: 'element-id', label: 'A' },
          },
        };
        const updatedElements = {
          'element-id': {
            data: { id: 'element-id', label: 'B' },
          },
        };

        const wrapper = mount(<Graph elementsById={initialElements} />);
        getCytoscape(wrapper).elements('#element-id').remove();
        wrapper.setProps({ elementsById: updatedElements });
      });
    });
  });

  describe('callbacks', () => {
    describe('on click', () => {
      it('should call on click on background callback if event is emitted on cytoscape core', () => {
        const onClickOnBackground = jest.fn();
        const event = { type: 'vclick', position: { x: 100, y: 100 } };

        const wrapper = mount(<Graph onClickOnBackground={onClickOnBackground} />);
        getCytoscape(wrapper).emit(event);

        expect(onClickOnBackground).toBeCalledWith({ x: 100, y: 100 });
      });

      it('should call on click on element callback if event is emitted on node', () => {
        const elementsById = {
          'node-id': {
            group: 'nodes',
            data: { id: 'node-id' },
          },
        };
        const onClickOnElement = jest.fn();
        const event = { type: 'vclick' };

        const wrapper = mount(<Graph elementsById={elementsById} onClickOnElement={onClickOnElement} />);
        getCytoscape(wrapper).elements('#node-id').emit(event);

        expect(onClickOnElement).toBeCalledWith(elementTypes.NODE, 'node-id');
      });

      it('should call on click on element callback if event is emitted on edge', () => {
        const elementsById = {
          'edge-id': {
            group: 'edges',
            data: { id: 'edge-id' },
          },
        };
        const onClickOnElement = jest.fn();
        const event = { type: 'vclick' };

        const wrapper = mount(<Graph elementsById={elementsById} onClickOnElement={onClickOnElement} />);
        getCytoscape(wrapper).elements('#edge-id').emit(event);

        expect(onClickOnElement).toBeCalledWith(elementTypes.EDGE, 'edge-id');
      });
    });
  });
});

import React from 'react';
import MockRouter from 'react-mock-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import PetriNetMenu from '../components/PetriNetMenu';
import rootReducer from '../reducers';
import PetriNetMenuContainer from './PetriNetMenuContainer';

describe('PetriNetMenuContainer', () => {
  it('should map petri nets from store to prop', () => {
    const state = {
      petriNets: ['petri-net-uuid-2', 'petri-net-uuid-1'],
      petriNetsById: {
        'petri-net-uuid-1': {
          id: 'petri-net-uuid-1',
          data: 'data-1',
        },
        'petri-net-uuid-2': {
          id: 'petri-net-uuid-2',
          data: 'data-2',
        }
      },
    };
    const store = createStore(rootReducer, state);
    const petriNets = [
      {
        id: 'petri-net-uuid-2',
        data: 'data-2',
      },
      {
        id: 'petri-net-uuid-1',
        data: 'data-1',
      }
    ];

    const wrapper = mount(
      <Provider store={store}>
        <MockRouter>
          <PetriNetMenuContainer />
        </MockRouter>
      </Provider>
    );

    const menu = wrapper.find(PetriNetMenu);
    expect(menu.prop('petriNets')).toEqual(petriNets);
  });

  it('should map selected petri net id from params to prop', () => {
    const params = {
      id: 'petri-net-id',
    };
    const store = createStore(rootReducer);

    const wrapper = mount(
      <Provider store={store}>
        <MockRouter params={params}>
          <PetriNetMenuContainer />
        </MockRouter>
      </Provider>
    );

    const menu = wrapper.find(PetriNetMenu);
    expect(menu.prop('selectedId')).toEqual('petri-net-id');
  });

  it('should push new location with petri net id on select', () => {
    const push = jest.fn();
    const store = createStore(rootReducer);

    const wrapper = mount(
      <Provider store={store}>
        <MockRouter push={push}>
          <PetriNetMenuContainer />
        </MockRouter>
      </Provider>
    );
    const menu = wrapper.find(PetriNetMenu);
    menu.props().onSelect('petri-net-id');

    expect(push).toBeCalledWith('/petri-net-id');
  });
});

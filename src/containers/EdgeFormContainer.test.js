import React from 'react';
import MockRouter from 'react-mock-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { SET_WEIGHT, REMOVE_EDGE } from '../actions';
import EdgeForm from '../components/EdgeForm';
import EdgeFormContainer from './EdgeFormContainer';

const mountContainer = (props) => (
  mount(
    <Provider store={props.store}>
      <MockRouter params={props.params}>
        <EdgeFormContainer edgeId={props.edgeId} />
      </MockRouter>
    </Provider>
  )
);
const setupParams = () => ({
  id: 'petri-net-uuid-1',
});
const setupState = () => ({
  petriNetsById: {
    'petri-net-uuid-1': {
      id: 'petri-net-uuid-1',
      edgesById: {
        'edge-id': {
          id: 'edge-id',
          weight: 4,
        },
      },
      nodesById: {},
      markings: [{}],
    },
  },
});
const setupStore = () => ( configureStore()(setupState()) );

describe('EdgeFormContainer', () => {
  describe('weight', () => {
    it('should map weight from store to prop', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, edgeId: 'edge-id' });
      const form = wrapper.find(EdgeForm);

      expect(form.props().weight).toEqual(4);
    });

    it('should dispatch set weight action on weight change', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, edgeId: 'edge-id' });
      const form = wrapper.find(EdgeForm);
      form.props().onWeightChange(8);

      const action = store.getActions()[0];
      const expectedAction = {
        type: SET_WEIGHT,
        petriNetId: 'petri-net-uuid-1',
        edgeId: 'edge-id',
        weight: 8,
      };
      expect(action).toMatchObject(expectedAction);
    });
  });

  describe('delete', () => {
    it('should dispatch remove edge action on delete', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, edgeId: 'edge-id' });
      const form = wrapper.find(EdgeForm);
      form.props().onDelete();

      const action = store.getActions()[0];
      const expectedAction = { type: REMOVE_EDGE, petriNetId: 'petri-net-uuid-1', edgeId: 'edge-id' };
      expect(action).toMatchObject(expectedAction);
    });
  });
});

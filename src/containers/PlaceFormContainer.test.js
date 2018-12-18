import React from 'react';
import MockRouter from 'react-mock-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import {
  SET_LABEL, SET_CAPACITY_LIMIT, REMOVE_CAPACITY_LIMIT,
  SET_INITIAL_NUMBER_OF_TOKENS, REMOVE_NODE,
} from '../actions';
import PlaceForm from '../components/PlaceForm';
import PlaceFormContainer from './PlaceFormContainer';

const mountContainer = (props) => (
  mount(
    <Provider store={props.store}>
      <MockRouter params={props.params}>
        <PlaceFormContainer placeId={props.placeId} />
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
      edgesById: {},
      nodesById: {
        'place-id': {
          id: 'place-id',
          label: 'My Place',
          capacityLimit: 3,
        }
      },
      markings: [
        {
          'place-id': 1,
        }
      ],
    },
  },
});
const setupStore = () => ( configureStore()(setupState()) );

describe('PlaceFormContainer', () => {
  describe('label', () => {
    it('should map label from store to prop', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });
      const form = wrapper.find(PlaceForm);

      expect(form.props().label).toEqual('My Place');
    });

    it('should dispatch set label action on label change', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });
      const form = wrapper.find(PlaceForm);
      form.props().onLabelChange('new label');

      const action = store.getActions()[0];
      const expectedAction = {
        type: SET_LABEL,
        petriNetId: 'petri-net-uuid-1',
        nodeId: 'place-id',
        label: 'new label',
      };
      expect(action).toMatchObject(expectedAction);
    });
  });

  describe('capacity limit', () => {
    it('should map capacity limit from store to prop', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });

      const form = wrapper.find(PlaceForm);
      expect(form.props().capacityLimit).toEqual(3);
    });

    it('should dispatch set capacity limit action if capacity limit is set to a number', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });
      const form = wrapper.find(PlaceForm);
      form.props().onCapacityLimitChange(20);

      const action = store.getActions()[0];
      const expectedAction = {
        type: SET_CAPACITY_LIMIT,
        petriNetId: 'petri-net-uuid-1',
        placeId: 'place-id',
        capacityLimit: 20,
      };
      expect(action).toMatchObject(expectedAction);
    });

    it('should dispatch remove capacity limit action if capacity limit is set to null', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });
      const form = wrapper.find(PlaceForm);
      form.props().onCapacityLimitChange(null);

      const action = store.getActions()[0];
      const expectedAction = { type: REMOVE_CAPACITY_LIMIT, petriNetId: 'petri-net-uuid-1', placeId: 'place-id' };
      expect(action).toMatchObject(expectedAction);
    });

    it('should dispatch remove capacity limit action if capacity limit is set to undefined', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });
      const form = wrapper.find(PlaceForm);
      form.props().onCapacityLimitChange(undefined);

      const action = store.getActions()[0];
      const expectedAction = { type: REMOVE_CAPACITY_LIMIT, petriNetId: 'petri-net-uuid-1', placeId: 'place-id' };
      expect(action).toMatchObject(expectedAction);
    });

    it('should dispatch remove capacity limit action if capacity limit is set to empty value', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });
      const form = wrapper.find(PlaceForm);
      form.props().onCapacityLimitChange('');

      const action = store.getActions()[0];
      const expectedAction = { type: REMOVE_CAPACITY_LIMIT, petriNetId: 'petri-net-uuid-1', placeId: 'place-id' };
      expect(action).toMatchObject(expectedAction);
    });
  });

  describe('number of tokens', () => {
    it('should map number of tokens from store to prop', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });

      const form = wrapper.find(PlaceForm);
      expect(form.props().numberOfTokens).toEqual(1);
    });

    it('should dispatch set number of tokens action on number of tokens change', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });
      const form = wrapper.find(PlaceForm);
      form.props().onNumberOfTokensChange(42);

      const action = store.getActions()[0];
      const expectedAction = {
        type: SET_INITIAL_NUMBER_OF_TOKENS,
        petriNetId: 'petri-net-uuid-1',
        placeId: 'place-id',
        numberOfTokens: 42,
      };
      expect(action).toMatchObject(expectedAction);
    });
  });

  describe('delete', () => {
    it('should dispatch remove node action on delete', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, placeId: 'place-id' });
      const form = wrapper.find(PlaceForm);
      form.props().onDelete();

      const action = store.getActions()[0];
      const expectedAction = { type: REMOVE_NODE, petriNetId: 'petri-net-uuid-1', nodeId: 'place-id' };
      expect(action).toMatchObject(expectedAction);
    });
  });
});

import React from 'react';
import MockRouter from 'react-mock-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { SET_LABEL, REMOVE_NODE } from '../actions';
import TransitionForm from '../components/TransitionForm';
import TransitionFormContainer from './TransitionFormContainer';

const mountContainer = (props) => (
  mount(
    <Provider store={props.store}>
      <MockRouter params={props.params}>
        <TransitionFormContainer transitionId={props.transitionId} />
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
        'transition-id': {
          id: 'transition-id',
          label: 'My Transition',
        }
      },
      markings: [{}],
    },
  },
});
const setupStore = () => ( configureStore()(setupState()) );

describe('TransitionFormContainer', () => {
  describe('label', () => {
    it('should map label from store to prop', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, transitionId: 'transition-id' });
      const form = wrapper.find(TransitionForm);

      expect(form.props().label).toEqual('My Transition');
    });

    it('should dispatch set label action on label change', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, transitionId: 'transition-id' });
      const form = wrapper.find(TransitionForm);
      form.props().onLabelChange('new label');

      const action = store.getActions()[0];
      const expectedAction = {
        type: SET_LABEL,
        petriNetId: 'petri-net-uuid-1',
        nodeId: 'transition-id',
        label: 'new label',
      };
      expect(action).toMatchObject(expectedAction);
    });
  });

  describe('delete', () => {
    it('should dispatch remove node action on delete', () => {
      const params = setupParams();
      const store = setupStore();

      const wrapper = mountContainer({ store, params, transitionId: 'transition-id' });
      const form = wrapper.find(TransitionForm);
      form.props().onDelete();

      const action = store.getActions()[0];
      const expectedAction = { type: REMOVE_NODE, petriNetId: 'petri-net-uuid-1', nodeId: 'transition-id' };
      expect(action).toMatchObject(expectedAction);
    });
  });
});

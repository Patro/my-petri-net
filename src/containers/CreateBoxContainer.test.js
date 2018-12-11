import React from 'react';
import MockRouter from 'react-mock-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { ADD_PETRI_NET } from '../actions';
import CreateBox from '../components/CreateBox';
import CreateBoxContainer from './CreateBoxContainer';

const mockStore = configureStore();
const mountContainer = (props) => (
  mount(
    <Provider store={props.store}>
      <MockRouter push={props.push}>
        <CreateBoxContainer />
      </MockRouter>
    </Provider>
  )
);

describe('CreateBoxContainer', () => {
  it('should dispatch create petri net action on create', () => {
    const store = mockStore();

    const wrapper = mountContainer({ store });

    const box = wrapper.find(CreateBox);
    box.props().onCreate('petri net name')

    const action = store.getActions()[0];
    const expectedAction = { type: ADD_PETRI_NET, name: 'petri net name' };
    expect(action).toMatchObject(expectedAction);
  });

  it('should push new location with petri net id on create', () => {
    const store = mockStore();
    const push = jest.fn();

    const wrapper = mountContainer({ store, push });
    const menu = wrapper.find(CreateBox);
    menu.props().onCreate('petri-net-id');

    const id = store.getActions()[0].petriNetId;
    expect(push).toBeCalledWith(`/${id}`);
  });
});

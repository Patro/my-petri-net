import React from 'react';
import MockRouter from 'react-mock-router';
import { Menu } from 'antd';
import { mount } from 'enzyme';
import ModeMenu from './ModeMenu';

const mountModeMenu = (props = {}) => (
  mount(
    <MockRouter params={props.params} push={props.push}>
      <ModeMenu />
    </MockRouter>
  )
)
describe('ModeMenu', () => {
  it('should render menu item for edit mode', () => {
    const wrapper = mountModeMenu();
    const menuItems = wrapper.find(Menu.Item).filter('[eventKey="edit"]');

    expect(menuItems).toHaveLength(1);
  });

  it('should render menu item for simulate mode', () => {
    const wrapper = mountModeMenu();
    const menuItems = wrapper.find(Menu.Item).filter('[eventKey="simulate"]');

    expect(menuItems).toHaveLength(1);
  });

  it('should map mode param to selected keys prop', () => {
    const wrapper = mountModeMenu({ params: { mode: 'edit' } });
    const menu = wrapper.find(Menu);
    const selectedKeys = menu.prop('selectedKeys');

    expect(selectedKeys).toEqual(['edit']);
  });

  it('should push location with edit mode on click on edit menu item', () => {
    const push = jest.fn();

    const wrapper = mountModeMenu({ push })
    const editMenuItem = wrapper.find(Menu.Item).filter('[eventKey="edit"]');
    editMenuItem.simulate('click');

    expect(push).toBeCalledWith('edit');
  });

  it('should push location with simulate mode on click on second menu item', () => {
    const push = jest.fn();

    const wrapper = mountModeMenu({ params: { id: 'petri-net-id' }, push })
    const simulateMenuItem = wrapper.find(Menu.Item).filter('[eventKey="simulate"]');
    simulateMenuItem.simulate('click');

    expect(push).toBeCalledWith('simulate');
  });
});

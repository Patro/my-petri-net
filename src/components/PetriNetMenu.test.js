import React from 'react';
import { Menu } from 'antd';
import { shallow } from 'enzyme';
import PetriNetMenu from './PetriNetMenu';

describe('PetriNetMenu', () => {
  it('should render one menu item per petri net', () => {
    const petriNets = [
      {
        id: 0,
        name: 'Petri Net 1',
      },
      {
        id: 1,
        name: 'Petri Net 2',
      },
      {
        id: 2,
        name: 'Petri Net 3',
      },
    ];
    const wrapper = shallow(<PetriNetMenu petriNets={petriNets} />);
    expect(wrapper.find(Menu.Item)).toHaveLength(3);
  });

  it('should render petri net id as key of menu item', () => {
    const petriNets = [
      {
        id: 'petri_net_id',
        name: 'Petri Net 1',
      },
    ];

    const wrapper = shallow(<PetriNetMenu petriNets={petriNets} />);
    expect(wrapper.find(Menu.Item).key()).toEqual('petri_net_id');
  });

  it('should render petri net name as content of menu item', () => {
    const petriNets = [
      {
        id: 'petri_net_id',
        name: 'Petri Net 1',
      },
    ];

    const wrapper = shallow(<PetriNetMenu petriNets={petriNets} />);
    expect(wrapper.find(Menu.Item).contains('Petri Net 1')).toBe(true);
  });

  it('should render selected id as selected keys prop of menu', () => {
    const petriNets = [
      {
        id: 'petri_net_id',
        name: 'Petri Net 1',
      },
    ];

    const wrapper = shallow(<PetriNetMenu petriNets={petriNets} selectedId='petri_net_id' />);
    expect(wrapper.find(Menu).prop('selectedKeys')).toEqual(['petri_net_id']);
  });

  it('should call on select callback on click', () => {
    const onSelect = jest.fn();
    const petriNets = [
      {
        id: 0,
        name: 'Petri Net 1',
      },
    ];

    const wrapper = shallow(<PetriNetMenu petriNets={petriNets} onSelect={onSelect} />);
    wrapper.find(Menu).simulate('click', { key: '0' });
    expect(onSelect).toBeCalledWith('0');
  });
});

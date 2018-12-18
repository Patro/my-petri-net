import React from 'react';
import { Button, Input } from 'antd';
import { shallow } from 'enzyme';
import TransitionForm from './TransitionForm';

describe('TransitionForm', () => {
  describe('label', () => {
    const getLabelInput = (wrapper) => ( wrapper.find(Input).filter('[id="label"]') );

    it('should render input field for label', () => {
      const wrapper = shallow(<TransitionForm />);
      const labelInput = getLabelInput(wrapper);

      expect(labelInput.length).toBe(1);
    });

    it('should map label to value of input field', () => {
      const wrapper = shallow(<TransitionForm label="My Place" />);
      const labelInput = getLabelInput(wrapper);

      expect(labelInput.props().value).toEqual('My Place');
    });

    it('should call on label change on label value change', () => {
      const onLabelChange = jest.fn();

      const wrapper = shallow(<TransitionForm onLabelChange={onLabelChange} />);
      const labelInput = getLabelInput(wrapper);
      labelInput.props().onChange({ target: { value: 'new label' } });

      expect(onLabelChange).toBeCalledWith('new label');
    });
  });

  describe('delete', () => {
    const getDeleteButton = (wrapper) => ( wrapper.find(Button).filter('[id="delete"]') );

    it('should render delete button', () => {
      const wrapper = shallow(<TransitionForm />);
      const button = getDeleteButton(wrapper);

      expect(button.length).toBe(1);
    });

    it('should call on delete on click on button', () => {
      const onDelete = jest.fn();

      const wrapper = shallow(<TransitionForm onDelete={onDelete} />);
      const button = getDeleteButton(wrapper);
      button.props().onClick();

      expect(onDelete).toBeCalled();
    });
  });
});

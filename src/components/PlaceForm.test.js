import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { shallow } from 'enzyme';
import PlaceForm from './PlaceForm';

describe('PlaceForm', () => {
  describe('label', () => {
    const getLabelInput = (wrapper) => ( wrapper.find(Input).filter('[id="label"]') );

    it('should render input field for label', () => {
      const wrapper = shallow(<PlaceForm />);
      const labelInput = getLabelInput(wrapper);

      expect(labelInput.length).toBe(1);
    });

    it('should map label to value of input field', () => {
      const wrapper = shallow(<PlaceForm label="My Place" />);
      const labelInput = getLabelInput(wrapper);

      expect(labelInput.props().value).toEqual('My Place');
    });

    it('should call on label change on label value change', () => {
      const onLabelChange = jest.fn();

      const wrapper = shallow(<PlaceForm onLabelChange={onLabelChange} />);
      const labelInput = getLabelInput(wrapper);
      labelInput.props().onChange({ target: { value: 'new label' } });

      expect(onLabelChange).toBeCalledWith('new label');
    });
  });

  describe('capacity limit', () => {
    const getCapacityLimitInput = (wrapper) => ( wrapper.find(InputNumber).filter('[id="capacityLimit"]') );

    it('should render input number field for capacity limit', () => {
      const wrapper = shallow(<PlaceForm />);
      const capacityLimitInput = getCapacityLimitInput(wrapper);

      expect(capacityLimitInput.length).toBe(1);
    });

    it('should map capacity limit to value of input number field', () => {
      const wrapper = shallow(<PlaceForm capacityLimit={5} />);
      const capacityLimitInput = getCapacityLimitInput(wrapper);

      expect(capacityLimitInput.props().value).toBe(5);
    });

    it('should call on capacity limit change on capacity limit value change', () => {
      const onCapacityLimitChange = jest.fn();

      const wrapper = shallow(<PlaceForm onCapacityLimitChange={onCapacityLimitChange} />);
      const capacityLimitInput = getCapacityLimitInput(wrapper);
      capacityLimitInput.props().onChange(7);

      expect(onCapacityLimitChange).toBeCalledWith(7);
    });
  });

  describe('number of tokens', () => {
    const getNumberOfTokensInput = (wrapper) => ( wrapper.find(InputNumber).filter('[id="numberOfTokens"]') );

    it('should render input number field for number of tokens', () => {
      const wrapper = shallow(<PlaceForm />);
      const numberOfTokensInput = getNumberOfTokensInput(wrapper);

      expect(numberOfTokensInput.length).toBe(1);
    });

    it('should map number of tokens to value of input number field', () => {
      const wrapper = shallow(<PlaceForm numberOfTokens={7} />);
      const numberOfTokensInput = getNumberOfTokensInput(wrapper);

      expect(numberOfTokensInput.props().value).toBe(7);
    });

    it('should call on number of tokens change on value change', () => {
      const onNumberOfTokensChange = jest.fn();

      const wrapper = shallow(<PlaceForm onNumberOfTokensChange={onNumberOfTokensChange} />);
      const numberOfTokensInput = getNumberOfTokensInput(wrapper);
      numberOfTokensInput.props().onChange(7);

      expect(onNumberOfTokensChange).toBeCalledWith(7);
    });
  });

  describe('delete', () => {
    const getDeleteButton = (wrapper) => ( wrapper.find(Button).filter('[id="delete"]') );

    it('should render delete button', () => {
      const wrapper = shallow(<PlaceForm />);
      const deleteButton = getDeleteButton(wrapper);

      expect(deleteButton.length).toBe(1);
    });

    it('should call on delete on click on button', () => {
      const onDelete = jest.fn();

      const wrapper = shallow(<PlaceForm onDelete={onDelete} />);
      const deleteButton = getDeleteButton(wrapper);
      deleteButton.props().onClick();

      expect(onDelete).toBeCalled();
    });
  });
});

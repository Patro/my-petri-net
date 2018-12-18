import React from 'react';
import { Button, InputNumber } from 'antd';
import { shallow } from 'enzyme';
import EdgeForm from './EdgeForm';

describe('EdgeForm', () => {
  describe('weight', () => {
    const getWeightInput = (wrapper) => ( wrapper.find(InputNumber).filter('[id="weight"]') );

    it('should render input number field for weight', () => {
      const wrapper = shallow(<EdgeForm />);
      const weightInput = getWeightInput(wrapper);

      expect(weightInput.length).toBe(1);
    });

    it('should map weight to value of input number field', () => {
      const wrapper = shallow(<EdgeForm weight={2} />);
      const weightInput = getWeightInput(wrapper);

      expect(weightInput.props().value).toEqual(2);
    });

    it('should call on weight change on value change', () => {
      const onWeightChange = jest.fn();

      const wrapper = shallow(<EdgeForm onWeightChange={onWeightChange} />);
      const weightInput = getWeightInput(wrapper);
      weightInput.props().onChange(5);

      expect(onWeightChange).toBeCalledWith(5);
    });
  });

  describe('delete', () => {
    const getDeleteButton = (wrapper) => ( wrapper.find(Button).filter('[id="delete"]') );

    it('should render delete button', () => {
      const wrapper = shallow(<EdgeForm />);
      const button = getDeleteButton(wrapper);

      expect(button.length).toBe(1);
    });

    it('should call on delete on click on button', () => {
      const onDelete = jest.fn();

      const wrapper = shallow(<EdgeForm onDelete={onDelete} />);
      const button = getDeleteButton(wrapper);
      button.props().onClick();

      expect(onDelete).toBeCalled();
    });
  });
});

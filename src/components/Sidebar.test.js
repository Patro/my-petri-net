import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('should render without crashing', () => {
    shallow(<Sidebar />);
  });
});

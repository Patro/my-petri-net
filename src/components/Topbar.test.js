import React from 'react';
import { shallow } from 'enzyme';
import Topbar from './Sidebar';

describe('Topbar', () => {
  it('should render without crashing', () => {
    shallow(<Topbar />);
  });
});

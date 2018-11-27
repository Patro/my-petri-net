import petriNet from './petriNet';
import edgesById from './edgesById';
import { addEdge } from '../actions';

jest.mock('./edgesById');

describe('petri net reducer', () => {
  describe('delegated edge actions', () => {
    beforeEach(() => {
      edgesById.mockImplementation((state, action) => ('mocked return value'));
    });
  
    it('should delegate ADD_EDGE', () => {
      const stateBefore = {
        id: 0,
        edgesById: {},
      };
      const action = addEdge(0, 1, 2);
      const stateAfter = {
        id: 0,
        edgesById: 'mocked return value' 
      };
  
      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });
  });
});
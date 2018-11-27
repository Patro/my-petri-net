import markings from './markings';
import { setInitialNumberOfTokens } from '../actions';

describe('markings reducer', () => {
  describe('should handle ADD_INITIAL_NUMBER_OF_TOKENS', () => {
    it('with undefined state', () => {
      const stateBefore = undefined;
      const action = setInitialNumberOfTokens(0, 1, 5);
      const stateAfter = [
        {
          1: 5,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with existing initial marking', () => {
      const stateBefore = [
        {
          0: 1,
          1: 3,
        },
        {
          0: 3,
          1: 2,
        }
      ];
      const action = setInitialNumberOfTokens(0, 1, 5);
      const stateAfter = [
        {
          0: 1,
          1: 5,
        },
        {
          0: 3,
          1: 2,
        }
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });
  });
});

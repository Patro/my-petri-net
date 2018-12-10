import { getPetriNets } from './index';

describe('get petri nets', () => {
  it('should return empty array with initial state', () => {
    const state = {
      petriNets: [],
      petriNetsById: {},
    };
    const petriNets = [];

    expect(getPetriNets(state)).toEqual(petriNets);
  });

  describe('should return array of petri nets', () => {
    it('with one petri net', () => {
      const state = {
        petriNets: ['petri-net-uuid'],
        petriNetsById: {
          'petri-net-uuid': {
            id: 'petri-net-uuid',
            data: 'data',
          },
        },
      };
      const petriNets = [
        {
          id: 'petri-net-uuid',
          data: 'data',
        },
      ];

      expect(getPetriNets(state)).toEqual(petriNets);
    });

    it('with two petri nets', () => {
      const state = {
        petriNets: ['petri-net-uuid-2', 'petri-net-uuid-1'],
        petriNetsById: {
          'petri-net-uuid-1': {
            id: 'petri-net-uuid-1',
            data: 'data-1',
          },
          'petri-net-uuid-2': {
            id: 'petri-net-uuid-2',
            data: 'data-2',
          }
        },
      };
      const petriNets = [
        {
          id: 'petri-net-uuid-2',
          data: 'data-2',
        },
        {
          id: 'petri-net-uuid-1',
          data: 'data-1',
        }
      ];

      expect(getPetriNets(state)).toEqual(petriNets);
    });
  });
});

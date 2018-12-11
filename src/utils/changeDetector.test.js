import changeDetector from './changeDetector';

describe('changeDetector', () => {
  describe('compare by value', () => {
    it('should call on add callback for added objects', () => {
      const prev = [0];
      const current = [0, 1];
      const onAdd = jest.fn();

      changeDetector.compareByValue({ prev, current, onAdd });

      expect(onAdd).toBeCalledWith(1);
    });

    it('should call on remove callback for removed objects', () => {
      const prev = [0, 1];
      const current = [0];
      const onRemove = jest.fn();

      changeDetector.compareByValue({ prev, current, onRemove });

      expect(onRemove).toBeCalledWith(1);
    });

    it('should call on remain callback for remaining objects', () => {
      const prev = [0];
      const current = [0];
      const onRemain = jest.fn();


      changeDetector.compareByValue({ prev, current, onRemain });

      expect(onRemain).toBeCalledWith(0);
    });
  });

  describe('compare by keys', () => {
    it('should call on add callback for added keys', () => {
      const prev = { 0: 'val0' };
      const current = { 0: 'val0', 1: 'val1' };
      const onAdd = jest.fn();

      changeDetector.compareByKey({ prev, current, onAdd });

      expect(onAdd).toBeCalledWith('val1');
    });

    it('should call on remove callback for removed keys', () => {
      const prev = { 0: 'val0', 1: 'val1' };
      const current = { 0: 'val0' };
      const onRemove = jest.fn();

      changeDetector.compareByKey({ prev, current, onRemove });

      expect(onRemove).toBeCalledWith('val1');
    });

    it('should call on remain callback for remaining keys', () => {
      const prev = { 0: 'val0' };
      const current = { 0: 'val0' };
      const onRemain = jest.fn();

      changeDetector.compareByKey({ prev, current, onRemain });

      expect(onRemain).toBeCalledWith('val0');
    });
  });
});

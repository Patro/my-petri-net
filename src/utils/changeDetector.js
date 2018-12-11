const keyToValueMapper = (callback, obj) => {
  if (callback === undefined) {
    return;
  }
  return (key) => callback(obj[key]);
};

export const compareByKey = ({ prev, current, onAdd, onRemove, onRemain }) => {
  compareByValue({
    prev: Object.keys(prev),
    current: Object.keys(current),
    onAdd: keyToValueMapper(onAdd, current),
    onRemove: keyToValueMapper(onRemove, prev),
    onRemain: keyToValueMapper(onRemain, current),
  });
};

export const compareByValue = ({ prev, current, onAdd, onRemove, onRemain }) => {
  const added = current.filter(val => prev.indexOf(val) === -1);
  const removed = prev.filter(val => current.indexOf(val) === -1);
  const subsisted = current.filter(val => added.indexOf(val) === -1);

  if (onAdd !== undefined) {
    added.forEach(val => onAdd(val));
  }
  if (onRemove !== undefined) {
    removed.forEach(val => onRemove(val));
  }
  if (onRemain !== undefined) {
    subsisted.forEach(val => onRemain(val));
  }
};

export default {
  compareByKey,
  compareByValue,
};

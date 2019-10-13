const ArrayUtil = {
  remove: (arr, value) => {
    return arr.filter(x => x !== value);
  },

  removeObjectsByPropValue: (arr, prop, value) => {
    return arr.filter(obj => obj[prop] !== value)
  }
};

export default ArrayUtil;

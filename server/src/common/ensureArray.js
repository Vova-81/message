const ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value || value === 0) {
    return [value];
  }

  return [];
};

module.exports = ensureArray;

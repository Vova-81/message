// eslint-disable-next-line max-len
const moveArrayElement = (srcArray: any[], fromIndex: number, toIndex: number): any[] | null => {
  if (fromIndex < 0) {
    return null;
  }

  const arrayCopy = [...srcArray];
  const element = arrayCopy.splice(fromIndex, 1)[0];

  arrayCopy.splice(toIndex, 0, element);

  return arrayCopy;
};

export default moveArrayElement;

import makeBoolean from './boolean';

describe('reducer', () => {
  it('should be a function', () => {
    const reducer = makeBoolean(true, [], []);
    expect(reducer).toBeInstanceOf(Function);
  });
});

describe('initial state', () => {
  let reducer = makeBoolean(true, [], []);
  expect(reducer(undefined, {type: 'BLA'})).toEqual(true);

  reducer = makeBoolean(false, [], []);
  expect(reducer(undefined, {type: 'BLA'})).toEqual(false);
});

describe('true actions', () => {
  it('should turn the state to true', () => {
    const trueActions = ['A', 'B'];
    const falseActions = ['C', 'D'];
    const reducer = makeBoolean(false, trueActions, falseActions);

    trueActions.forEach((type) => {
      expect(reducer(true, {type})).toEqual(true);
      expect(reducer(false, {type})).toEqual(true);
    });
  });
});

describe('false actions', () => {
  it('should turn the state to false', () => {
    const trueActions = ['A', 'B'];
    const falseActions = ['C', 'D'];
    const reducer = makeBoolean(true, trueActions, falseActions);

    falseActions.forEach((type) => {
      expect(reducer(true, {type})).toEqual(false);
      expect(reducer(false, {type})).toEqual(false);
    });
  });
});

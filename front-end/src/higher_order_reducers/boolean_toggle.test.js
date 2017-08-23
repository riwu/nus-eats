import makeBooleanToggle from './boolean_toggle';

describe('reducer', () => {
  it('should be a function', () => {
    const reducer = makeBooleanToggle(true, []);
    expect(reducer).toBeInstanceOf(Function);
  });
});

describe('initial state', () => {
  it('should be used when the state is undefined', () => {
    let reducer = makeBooleanToggle(true, []);
    expect(reducer(undefined, {type: 'BLA'})).toEqual(true);

    reducer = makeBooleanToggle(false, []);
    expect(reducer(undefined, {type: 'BLA'})).toEqual(false);
  });
});

describe('toggle actions', () => {
  it('should toggle the state', () => {
    const toggleActions = ['HELLO', 'WORLD'];
    const reducer = makeBooleanToggle(false, toggleActions);

    toggleActions.forEach((type) => {
      expect(reducer(true, {type})).toEqual(false);
      expect(reducer(false, {type})).toEqual(true);
    });
  });
});

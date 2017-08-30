const makeBoolean = (initialState, trueActions, falseActions) => {
  const trueActionsSet  = new Set(trueActions);
  const falseActionsSet = new Set(falseActions);

  return (state = initialState, action) => {
    if (trueActionsSet.has(action.type)) {
      return true;
    }

    if (falseActionsSet.has(action.type)) {
      return false;
    }

    return state;
  };
};

export default makeBoolean;

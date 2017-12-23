function makeBooleanToggle(initialState, toggleActions) {
  const toggleActionsSet = new Set(toggleActions);

  return (state = initialState, action) => {
    if (toggleActionsSet.has(action.type)) {
      return !state;
    }

    return state;
  };
}

export default makeBooleanToggle;

const initialState = {
  version: '1.0.0',
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VERSION':
      return { ...state, version: '1.0.0' };
    default:
      return initialState;
  }
};

export default appState;

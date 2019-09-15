const initialState = {
  characterDetails: {},
  characters: [],
  loading: true
};

export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHARACTERS":
      return {
        ...state,
        loading: false,
        characters: action.payload
      };
    case "SENT_FETCH_CHARACTER_DETAILS":
      return {
        ...state,
        loading: true
      };
    case "FETCH_CHARACTER_DETAILS":
      return {
        ...state,
        loading: false,
        characterDetails: action.payload
      };
    default:
      return state;
  }
  return state;
};

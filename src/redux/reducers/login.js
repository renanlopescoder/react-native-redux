const initialState = {
  email: "renanlopescoder@gmail.com",
  loading: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload
      };
    case "LOGIN_PLAYER":
      return {
        ...state,
        loading: true
      };
    case "LOGIN_PLAYER_FULLFILED":
      return {
        ...state,
        player: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

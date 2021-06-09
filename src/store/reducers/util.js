const util = (state = true, action) => {
  switch (action.type) {
    case "THEME":
      return !state;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
};

export default util;

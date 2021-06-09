

export const ToggleTheme = () => async (dispatch) => {
  dispatch({
    type: "THEME",
  });
};

export const HeaderConfig = (getState) => {
  // Get token from state
  
  const token = getState().user.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
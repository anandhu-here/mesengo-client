import { logout } from "./authenticationService";

export const DJANGO_URL = "http://localhost:8000/api"
export const PROFILE_SEARCH_INITIAL_COUNT = 5;


export const HeaderConfig = (getState) => {
    // Get token from state
    
    const token = localStorage.getItem('token');
  
    // Headers
    const config = {
   
        'Content-Type': 'application/json',

    };
  
    // If token, add to headers config
    if (token) {
      config['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };

  
  const useHandleResponse = () => {
  
      const handleResponse = response => {
          return response.text().then(text => {
              const data = text && JSON.parse(text);
              if (!response.ok) {
                  if ([401, 403].indexOf(response.status) !== -1) {
                    logout();
                  }
  
                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
              }
  
              return {...data, status:'Authorized'};
          });
      };
  
      return handleResponse;
  };
  
  export default useHandleResponse;
  
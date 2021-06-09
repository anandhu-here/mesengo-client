
const initialState = {
  token:localStorage.getItem('token'),
  user_loading : false,
  isAuth: false,
  first_name:null,
  last_name:null,
  email:null,
  isLoading:false,
  profile_picture:null,
  user_profile_id:null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
        isAuth:true,
        user_loading:false,
        isLoading:false
      }
    case "LOGOUT":
      return {
        ...state,
        isAuth:false,
        user_loading:false,
        isLoading:false
      };
    case "USER_LOADING":
      return {
        ...state,
        user_loading:true,
        isLoading:true
      }
    case "USER_LOADED":
      return{
        ...state,
        user_loading:false,
        isAuth:true,
        isLoading:false
      }
    case "LOGIN_SUCCESS":
      return{
        ...state,
        user_loading:false,
        isAuth:true,
        isLoading:false
      }
    case "AUTH_ERROR":
      return{
        ...state,
        user_loading:false,
        isAuth: false,
        isLoading:false
      }
    default:
      return state;
  }
};

export default user;

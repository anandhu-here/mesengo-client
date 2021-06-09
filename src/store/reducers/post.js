const initialState = {
    upload_data:{}
}
const post = (state = initialState, action) => {
    switch (action.type) {
      case "POST_UPLOADED":
        return {
            ...state.upload_data,
            ...action.payload
        }; 
      default:
        return state;
    }
  };
  
  export default post;
  
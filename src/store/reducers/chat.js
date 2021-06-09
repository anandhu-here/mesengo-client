const initialState = {
    is_open:false,
    other_user:localStorage.getItem('current_chat_user_name') || null,
    id:localStorage.getItem('current_chat_id') || null,
    profile_picture:null, 
    selected:false,
    profile_id:null
};


const chat = (state=initialState, action) =>{
    switch (action.type) {
        case "CHAT_OPEN":
            return {
                ...state,
                is_open:true
            }
        case "CHAT_CLOSE":
            return{
                ...state,
                is_open:false
            }
        case "CHAT_USER_LOADED":
            return{
                ...state,
                ...action.payload
            }
        case "CHAT_USER_SELECTED":
            return{
                ...state,
                selected:true,
                ...action.payload
            }
        case "CHAT_USER_DESELECTED":
            return{
                ...state,
                selected:false,
                other_user:null,
                id:null,
                profile_picture:null,

            }
        default:
            return state;
    }
}
export default chat;
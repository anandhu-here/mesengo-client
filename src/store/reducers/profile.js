const initialState = {first_name:null, last_name:null, bio:null, id:null, follower_count:null, following_count:null, is_following:null, profile_picture:null}


export const profile = (state=initialState, action)=>{
    switch (action.type) {
        case "PROFILE_INFO_STORED":
            return {
                ...state,
                ...action.payload
            }
        case "CLEAR_PROFILE":
            return {first_name:null, last_name:null, bio:null, id:null, follower_count:null, following_count:null, is_following:null,profile_picture:null, ...state}
        
        default:
            return state
        }
        
    }

export default profile;
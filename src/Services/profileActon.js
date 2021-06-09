import useHandleResponse, { PROFILE_SEARCH_INITIAL_COUNT } from "./utils";

export function useprofileAction() {
    const token = localStorage.getItem('token');
    
    const followProfile = (id) => {
        const handleResponse = useHandleResponse();
        return fetch(
            `/api/profle/follow`,
            {
                method: 'POST',
                headers:{
                    'Authorization' : `Token ${token}`
                },

                body:JSON.stringify({id:id})
            
            }
            
            
        )
            .then(handleResponse)
            
    };

    return followProfile;
}
export function useGetProfile() {
    const token = localStorage.getItem('token');
    
    const getProfile = (id) => {
        const handleResponse = useHandleResponse();
        return fetch(
            `/api/profile/?id=${id}`,
            {
                method: 'GET',
                headers:{
                    'Authorization' : `Token ${token}`
                }
            }
            
            
        )
            .then(handleResponse)
            
    };

    return getProfile;
}



export function useSearchProfile() {
    const token = localStorage.getItem('token');
    const searchProfile = (query, c) => {
        const handleResponse = useHandleResponse();
        return fetch(
            `/api/profile/search?query=${query}&size=${PROFILE_SEARCH_INITIAL_COUNT + c}`,
            {
                method: 'GET',
                headers:{
                    'Authorization' : `Token ${token}`
                }
            }
            
            
        )
            .then(handleResponse)
            
    };

    return searchProfile;
}

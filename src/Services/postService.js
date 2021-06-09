import useHandleResponse, {HeaderConfig, DJANGO_URL} from './utils';
export function usecreatePosts() {
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Token ${token}`
        }
    };

    const createPost = (data) => {
        const handleResponse = useHandleResponse();
        return fetch(
            `/api/posts/create`,
            {
                method: 'POST',
                body: data,
                headers:{
                    'Authorization' : `Token ${token}`
                }
            }
            
            
        )
            .then(handleResponse)
            
    };

    return createPost;
}

export function usefeedPosts() {
    const token = localStorage.getItem('token');
    
    const getFeedPost = () => {
        const handleResponse = useHandleResponse();
        return fetch(
            `/api/posts/feed`,
            {
                method: 'GET',
                headers:{
                    'Authorization' : `Token ${token}`
                }
            }
            
            
        )
            .then(handleResponse)
            
    };

    return getFeedPost;
}


export function usePostsAction() {
    const token = localStorage.getItem('token');
    
    const postAction = (data) => {
        const handleResponse = useHandleResponse();
        return fetch(
            `/api/posts/action`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Token ${token}`
                },
                body:JSON.stringify(data)
            }
            
            
        )
            .then(handleResponse)
            
    };

    return postAction;
}


export function useprofilePosts() {
    const token = localStorage.getItem('token');
    
    const getProfilePosts = (id) => {
        const handleResponse = useHandleResponse();
        return fetch(
            `/api/posts/posts?id=${id}`,
            {
                method: 'GET',
                headers:{
                    'Authorization' : `Token ${token}`
                }
            }
            
            
        )
            .then(handleResponse)
            
    };

    return getProfilePosts;
}
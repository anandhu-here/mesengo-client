import useHandleResponse, {HeaderConfig, DJANGO_URL} from './utils';
export function useGetUsers() {
    const requestOptions = {
        method: 'GET',
        headers: HeaderConfig(),
    };

    const getUsers = () => {
        const handleResponse = useHandleResponse();
        return fetch(
            `/api/auth/user`,
            requestOptions,
            
        )
            .then(handleResponse)
            
    };

    return getUsers;
}

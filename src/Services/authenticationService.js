import useHandleResponse from "./utils";




export function useLogin() {

    const login = (data) => {
        const handleResponse = useHandleResponse();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        return fetch(
            `/api/auth/login`,
            requestOptions
        )
            .then(handleResponse)
           
            
    };

    return login;
}

export function useRegister() {
    const handleResponse = useHandleResponse();

    const register = ({first_name,last_name, email, password}) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name,last_name, email, password }),
        };

        return fetch(
            `/api/auth/register`,
            requestOptions
        )
            .then(handleResponse)
            
    };

    return register;
}

export function logout() {
    localStorage.removeItem('currentUser');
}

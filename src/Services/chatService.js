import useHandleResponse from "./utils";



// // Receive global messages
// export function useGetGlobalMessages() {
//     const { enqueueSnackbar } = useSnackbar();
//     const handleResponse = useHandleResponse();
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader(),
//     };

//     const getGlobalMessages = () => {
//         return fetch(
//             `${process.env.REACT_APP_API_URL}/api/messages/global`,
//             requestOptions
//         )
//             .then(handleResponse)
//             .catch(() =>
//                 enqueueSnackbar('Could not load Global Chat', {
//                     variant: 'error',
//                 })
//             );
//     };

//     return getGlobalMessages;
// }

// // Send a global message
// export function useSendGlobalMessage() {
//     const { enqueueSnackbar } = useSnackbar();
//     const handleResponse = useHandleResponse();

//     const sendGlobalMessage = body => {
//         const requestOptions = {
//             method: 'POST',
//             headers: authHeader(),
//             body: JSON.stringify({ body: body, global: true }),
//         };

//         return fetch(
//             `${process.env.REACT_APP_API_URL}/api/messages/global`,
//             requestOptions
//         )
//             .then(handleResponse)
//             .catch(err => {
//                 console.log(err);
//                 enqueueSnackbar('Could send message', {
//                     variant: 'error',
//                 });
//             });
//     };

//     return sendGlobalMessage;
// }

// // Get list of users conversations
// export function useGetConversations() {
//     const { enqueueSnackbar } = useSnackbar();
//     const handleResponse = useHandleResponse();
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader(),
//     };

//     const getConversations = () => {
//         return fetch(
//             `${process.env.REACT_APP_API_URL}/api/messages/conversations`,
//             requestOptions
//         )
//             .then(handleResponse)
//             .catch(() =>
//                 enqueueSnackbar('Could not load chats', {
//                     variant: 'error',
//                 })
//             );
//     };

//     return getConversations;
// }

// // get conversation messages based on
// // to and from id's
// export function useGetConversationMessages() {
//     const { enqueueSnackbar } = useSnackbar();
//     const handleResponse = useHandleResponse();
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader(),
//     };

//     const getConversationMessages = id => {
//         return fetch(
//             `${
//                 process.env.REACT_APP_API_URL
//             }/api/messages/conversations/query?userId=${id}`,
//             requestOptions
//         )
//             .then(handleResponse)
//             .catch(() =>
//                 enqueueSnackbar('Could not load chats', {
//                     variant: 'error',
//                 })
//             );
//     };

//     return getConversationMessages;
// }

export function useSendConversationMessage() {
    const handleResponse = useHandleResponse();
    const token = localStorage.getItem('token');
    const sendConversationMessage = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization' : `Token ${token}` },
            body:JSON.stringify(data)
        };

        return fetch(
            `/api/messenger/create_message`,
            requestOptions
        )
            .then(handleResponse)
            .catch(err => {
                alert("coudlnt send mesages")
            });
    };

    return sendConversationMessage;
}

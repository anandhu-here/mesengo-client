export const profileInfoAction = (data) => async (dispatch) => {
    dispatch({
      type: "PROFILE_INFO_STORED",
      payload: data,
    });
};


export const clearProfileState = () => async (dispatch) =>{
    dispatch({type:"CLEAR_PROFILE"})
}

export const  PostUpload = (data) => async (dispatch) =>{
    dispatch({
        type:'POST_UPLOADED',
        payload:data
    })
}
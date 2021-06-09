import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const {isAuth, user_loading} = useSelector(state=>state.user);
    return(
        <Route
            {...rest}
            render={(props) => {
            if (user_loading) {
                return <h2>Loading...</h2>;
            } else if (!isAuth) {
                return <Redirect to="/login" />;
            } else {
                return <Component {...props} />;
            }
            }}
        />
)};


export default PrivateRoute;
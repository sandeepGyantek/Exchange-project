// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading },
//     ...rest }) => (
//     <Route {...rest} render={props =>
//         !isAuthenticated && !loading ?
//             (<Redirect to="/login" />) :
//             (<Component {...props} />)} />
// )

// PrivateRoute.propTypes = {
//     auth: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//     auth: state.auth
// })

// export default connect(mapStateToProps)(PrivateRoute);


import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

const PrivateRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem('token')
  console.log(token);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            token ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;
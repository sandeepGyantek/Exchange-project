import React, { Fragment } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "./../Redux/actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Logout = ({ auth: { isAuthenticated, loading }, logout }) => {
  const history = useHistory();
  // const logout = () => {
  //   localStorage.clear();
  //   return <Redirect path='/login' />;
  //   // history.push('/login')
  // };
  const profile = useSelector((state) => state.profile.profile);
  return (
    <Fragment>
      <div className='dropdown-header d-flex flex-column align-items-center'>
        <div className='figure mb-3 profile_avatar'>
          {profile ? (
            <img src={`http:${profile.avatar}`} alt='avatar' />
          ) : (
            <img src={"img/avatar.svg"} alt='avatar' />
          )}
        </div>
        <div className='info text-center'>
          <p className='name font-weight-bold mb-0'>
            {" "}
            {profile && profile.firstName}{" "}
          </p>
          <p className='email text-muted mb-3'>{profile && profile.email}</p>
        </div>
      </div>
      <div className='dropdown-body'>
        <ul className='profile-nav'>
          <li className='nav-item'>
            <Link to='/profile' className='nav-link'>
              <i className='icon ion-md-person'></i>
              <span>Profile</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/wallet' className='nav-link'>
              <i className='icon ion-md-wallet'></i>
              <span>My Wallet</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/settings' className='nav-link'>
              <i className='icon ion-md-settings'></i>
              <span>Settings</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-link red'>
              <i className='icon ion-md-power'></i>
              <span onClick={logout}>Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

// export default Logout;
const mapStateProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateProps, { logout })(Logout);
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory} from 'react-router-dom';
import { register } from '../Redux/actions/auth';
import PropTypes from 'prop-types';

const Register = ({register, isAuthenticated}) =>  {
  const history = useHistory();
  
  const  [formData, setFormData ] = useState({
    fullName: '',
      email: '',
      checkbox: '',
      password: '',
      password2: ''   
  });

  const { fullName, email, password, password2, checkbox } = formData;

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e =>{
      e.preventDefault();
 
     if(password !== password2){
         alert('password can not match');
     } else {
        register ({ fullName, email, password });
        // history.push('/login');
     }
     
  };

  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form onSubmit={e => onSubmit(e)}>
          <img src={'img/temp'} alt="logo" />
            <span>Create Account</span>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="fullName" 
                value={fullName}
                onChange={e => onChange(e)}
                // required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email" 
                value={email}
                onChange={e => onChange(e)}
                // required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password" 
                value={password}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="password2" 
                value={password2}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="form-checkbox"
                name="checkbox" 
                value={checkbox}
                onChange={e => onChange(e)}
                required
              />
              <label className="custom-control-label" htmlFor="form-checkbox">
                I agree to the{' '}
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </form>
          <h2>
            Already have an account?
            <Link to="/login"> Sign in here</Link>
          </h2>
        </div>
      </div>
    </>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,
   { register }
   )(Register);

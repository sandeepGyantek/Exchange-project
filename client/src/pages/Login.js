import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../Redux/actions/auth';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

const Login = ({ 
  login, 
  isAuthenticated,
  twoFA 
}) => {
  // console.log(twoFA);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
});
 
  const { email, password } = formData;
  const onChange = e =>
   setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = async e =>{
       e.preventDefault();
      login(email, password);
   };


   //Redirect if logged in 
   if(isAuthenticated) {
      if(twoFA === false){
        return <Redirect to="/twofa" />
      }
     if(twoFA === true){
        return <Redirect to="/twofa2" />
      }
      return <Redirect to='profile' />
   }else{
    return <div className="vh-100 d-flex justify-content-center">
             <div className="form-access login my-auto">
            <form onSubmit={e => onSubmit(e)}>
            <img src={'img/temp'} alt="logo" />
              <span>Sign In </span>
  
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
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
  
              <div className="text-right">
                <Link to="/reset">Forgot Password?</Link>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="form-checkbox"
                />
                <label className="custom-control-label" htmlFor="form-checkbox">
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </form>
            <h2>
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </h2>
          </div>
        </div>
  }
   }

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  twoFA: state.auth.twoFA
});

export default connect(mapStateToProps, { login })(Login);

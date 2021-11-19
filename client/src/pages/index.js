import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import { Switch, Route } from 'react-router-dom';
import Exchange from '../pages/exchange';
import Markets from '../pages/markets';
import Profile from './Profile';
import Wallet from './wallet';
import Settings from './settings';
import Login from './Login';
import Reset from './reset';
import OtpVerify from './otp-verify';
import OtpNumber from './otp-number';
import Lock from './lock';
import TermsAndConditions from './terms-and-conditions';
import NewsDetails from './news-details';
import Register from './Singup';
import Notfound from './notfound';
import store from '../Redux/store';
import { loadUser } from '../Redux/actions/auth';

import setAuthToken from '../Redux/utils/setAuthToken';
import Twofa from './Twofa';
import Twofa2 from './Twofa2';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function Index() {
  useEffect(() =>{
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      
        <Switch>
        <Route path="/twofa">
            <Twofa />
          </Route>

          <Route path="/twofa2">
            <Twofa2 />
          </Route>

          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
        <Layout>   
          <Route path='/exchange'>
            <Exchange />
          </Route>
          <Route path="/markets">
            <Markets />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/wallet">
            <Wallet />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
          <Route path="/otp-verify">
            <OtpVerify />
          </Route>
          <Route path="/otp-number">
            <OtpNumber />
          </Route>
          <Route path="/lock">
            <Lock />
          </Route>
          <Route path="/terms-and-conditions">
            <TermsAndConditions />
          </Route>
          <Route path="/news-details">
            <NewsDetails />
          </Route>
          <Route path="/notfound">
            <Notfound />
          </Route>
        </Layout>
        </Switch>

    </>
  );
}

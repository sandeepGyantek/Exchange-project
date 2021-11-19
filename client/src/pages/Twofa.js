import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
var base32 = require('hi-base32');
var QRCode = require('qrcode');
var speakeasy = require("speakeasy");




const Twofa = () => {
    const [image, setImage] = useState();
    const [input, setInput] = useState("");
    
    // const isAuthenticated = useSelector((state) => state.auth.isAuthentication);
    // console.log(isAuthenticated);
    const useremail = localStorage.getItem('email');
    // console.log(useremail);
    const twoFA = true;
    
    var secret = 'DFGRTGKTHGJDRTDLITHFJHGSDKFHG';
    // const orignalEmail = user && user.email;
    const orignalEmail = useremail;
    // console.log(orignalEmail);
    // const email = user && user.email.slice(0, 3).toUpperCase();
    const email = useremail.slice(0, 3).toUpperCase();
    // console.log(email);
    const finalsecret = base32.encode(email + secret);
    // console.log(finalsecret);
    const site = 'exchange('+orignalEmail+')';
    // console.log(site);

    var otpauth_url = 'otpauth://totp/'+site+'?secret='+finalsecret+'';
    // console.log(otpauth_url)

    const userToken = input;
    // console.log(userToken);
    const base32secret = base32.decode(finalsecret) ;
    // console.log(base32secret);

    const displayQR = () => {
        QRCode.toDataURL(otpauth_url).then((resResult) => {
            // console.log(resResult);
            setImage(resResult);
        })  
    }
    displayQR();

    const onSubmitHandler = e => {
        e.preventDefault();
 
        let verified = speakeasy.totp.verify({ secret: base32secret,
        encoding: 'ascii',
        token: userToken,
        // window: 2
    });
        console.log(secret);
         console.log(verified);
        //  setVerified(verified);
         if(verified === true) {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = axios.post('/api/profile/2fa',{twoFA, config})
            res.then((response) => {
                console.log(response);
            })  .catch(error => {
                console.error('There was an error!', error);
            });

            
            localStorage.removeItem('token');
            window.location.href = '/login';
            }
      }



    return (
        <Fragment>
            <div className="twofa_wrapper">
                <h3> TWO-FACTOR AUTHENTICATION </h3>
                <p>
                    The 2FA is the final step before you get full access to your account.
                </p>
                <h5>
                    HOW TO ENABLE TWO-FACTOR AUTHENTICATION <br />
                    1 DOWNLOAD GOOGLE AUTHENTICATOR ON YOUR MOBILE DEVICE.
                </h5>
                <div className="twofa_icons">
                    <div className="authenticator_icon">
                        <img src={"img/icon/19.png"} alt="auth_icon" />
                        <p> Google authenticator </p>
                    </div>

                    <Link to="#">
                        <span> <img src={"img/icon/20.png"} alt="auth_icon" /> </span>
                    </Link>
                    <Link to="#">
                        <span> <img src={"img/icon/21.png"} alt="auth_icon" /> </span>
                    </Link>

                    <div className="codebar_scan">
                        <img src={image} alt="qrcode" />
                    </div>
                </div>


                <div className="twofa_input">
                    <form>
                        <input
                            type="text"
                            placeholder="Enter 2FA"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <br />
                        <button type="button" onClick={onSubmitHandler}> submit </button>
                    </form>

                </div>
            </div>

        </Fragment>
    )
}

export default Twofa;


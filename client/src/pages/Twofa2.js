import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
var base32 = require('hi-base32');
var QRCode = require('qrcode');
var speakeasy = require("speakeasy");

const Twofa2 = () => {
    const history = useHistory();
    const [input, setInput] = useState("");

    
      const useremail = localStorage.getItem('email');
      // console.log(useremail);
      
      var secret = 'DFGRTGKTHGJDRTDLITHFJHGSDKFHG';
      // const orignalEmail = user && user.email;
      const orignalEmail = useremail;
      // console.log(orignalEmail);
      // const email = user && user.email.slice(0, 3).toUpperCase();
      const email = useremail.slice(0, 3).toUpperCase();
      // console.log(email);
      const finalsecret = base32.encode(email + secret);
      // console.log(finalsecret);
    
  
      const userToken = input;
      // console.log(userToken);
      const base32secret = base32.decode(finalsecret);
    //  console.log(base32secret);



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
            history.push('/profile')
            }
      }

    return (
        <Fragment>
             <div className="twofa2_wrapper">
                <h3> TWO-FACTOR AUTHENTICATION </h3>
                
                <div className="twofa2_input">
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

export default Twofa2

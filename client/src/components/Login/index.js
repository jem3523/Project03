import React, { useState, useEffect, useContext } from "react";
import { Input } from "../Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import globalContext from "../../utils/store.js";

// default undefined from App.js

function Login(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let history = useHistory();

  // const {email: globalEmail, setEmail: setGlobalEmail } = useContext(
  //   globalContext
  // );

  const handleEmail = event => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  };

  const handlePassword = event => {
    setPassword(event.target.value);
    // console.log(event.target.value)
  };

  // need to fix log in and add redirect
  const handleClick = () => {
    
    console.log("email sent on log in click", email);
    console.log("password send on log in click", password);
    axios({
      method: "post",
      url: "/api/user/login",
      data: {
        email: email,
        password: password
      }
    })
      .then(data => {
        console.log("log in data", data);
        if (data) {
          // double check the data structure 
          // setGlobalEmail(data.data.user.email);
          history.push("/trips");
        }
      })
      .catch(err => {
        console.log("log in error", err);
      });

    // Need to direct to "/trips"
    // .then(data => {
    //   // data.data is part of the json (message sent from backend)
    //   if (data.data === "User Created!"){
    //     // redirect works but page not rendered correctly yet
    //     history.push("/trips");
    //   }

    //   console.log("signup", data);
    //   // this.setState({ email: data })
    // })

    // .catch(console.log);
  };

  // write function to check if authenticated (goes in app.js?)

  // figure out how to push the email (after authenticated log in) to global context

  return (
    <div>
      <h3>Log In</h3>
      <p>Email</p>
      <Input onChange={event => handleEmail(event)} />
      <p>Password</p>
      <Input onChange={event => handlePassword(event)} />

      <button onClick={() => handleClick()}>Log In!</button>
    </div>
  );
}

export default Login;
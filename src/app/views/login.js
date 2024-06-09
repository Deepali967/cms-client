import React, { useState } from "react";

import './login.scss'
import axios from "axios";

const Login = () => {

    const [inputs, setInputs] = useState({});

  let [errorObj, setErrorObj] = useState({
    userId: "Field is Required",
    password: "Field is Required",
  });

  let [showErrors, setShowErrors] = useState(false);


  const handleChange = (e) => {
    if (showErrors) {
      setShowErrors(false);
    }

    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));

    validateuserInput(name, value);
  };


  const validateuserInput = (field, userValue) => {
    if (userValue.trim().length) {
      setErrorObj(
        Object.assign(errorObj, {
          [field]: "",
        })
      );
    } 
  };

  const proceed = () => { 
    let key = Object.keys(errorObj).filter((key) => errorObj[key] !== "");

    if (key.length) {
      setShowErrors(true);
      return;
    }


    axios
        .post(`${process.env.REACT_APP_API_HOST}/login`, inputs)
        .then((response) => {
          if (response.data) {
            resetErrors();
          }
        })
        .catch((err) => {
          console.log(err);
        });

  }

   const resetErrors = () => {
    setErrorObj(Object.assign(errorObj, { userId: "", password: "" }));
  };

   return (
   <React.Fragment> 
    <div className="login-component">
      <h1>Login</h1>

         <form className="login-form">
           <div className="form-group">
             <label htmlFor="userId">User ID:</label>
            <input onChange={(e)=>handleChange(e)} type="text" id="userId"  value={inputs?.userId || ""} name="userId" />
           </div>


          {showErrors && errorObj?.userId ? (
            <div className="error">{errorObj?.userId}</div>
          ) : (
            <></>
          )}
        
           <div className="form-group">
             <label htmlFor="password">Password:</label>
              <input onChange={(e)=>handleChange(e)} type="password"  value={inputs?.password || ""} id="password" name="password" />
           </div>

        
          {showErrors && errorObj?.password ? (
            <div className="error">{errorObj?.password}</div>
          ) : (
            <></>
          )}

        <div className="btn" onClick={()=> proceed()}>Login</div>
      </form>
       </div>
    </React.Fragment>
  );
 }

 export default Login;
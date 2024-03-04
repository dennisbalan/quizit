import React from 'react';
const Login = () => {
    return(
        <div>
            <h1> Login</h1>
            <p> Login in here</p>
            <label>
                Username
            </label>
            <br></br>
            <input type = "text" id = "username" name = "username"></input>
            <br></br>
            <label>Password</label>
            <br></br>
            <input type = "text" id = "password" name = "password"></input>
            <br></br>
            <button>login</button>
            <br></br>
            <button>Create Account</button>
        </div>
    
    );
}
export default Login;
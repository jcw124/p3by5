import React from "react";

const Login = () => (
    <div className="container">
        <form classNmae="login">
            <h3> Login or Register </h3>
            <div className="form-group">
                <label for="username">Username</label>
                <input type="username" name="username" className="form-control" />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <button className="btn btn-danger">Register</button>


        </form> 
    </div>
);

export default Login;

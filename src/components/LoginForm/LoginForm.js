import React from "react";
import {Redirect} from 'react-router-dom'

class LoginForm extends React.Component {

    userInput = React.createRef();
    passwordInput = React.createRef();


    state = {
        loggedIn: false
    };

    processForm = (event) => {
        event.preventDefault();

        const user = this.userInput.value.value;
        const password = this.passwordInput.value.value;

        const login = {
            grant_type: 'password',
            client_id: 'mobileV1',
            client_secret: 'abc123456',
            username: user,
            password: password
        };

        // TODO: Modify response
        fetch('http://localhost:7777/oauth/token', {
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
            .then(response => response.json())
            .then(res => {
                if (res.error === undefined) {

                    const dateTime = Date.now();
                    const timestamp = Math.floor(dateTime / 1000);

                    const object = {
                        type: 'owner',
                        data: res,
                        timestamp: timestamp,
                    };
                    sessionStorage.setItem('credentials', JSON.stringify(object));

                    this.setState({loggedIn: true});
                }
            });
    };

    render() {
        return (
            <div className="login-wrapper">
                <div className="login">
                    <h1>Login</h1>
                    <form onSubmit={this.processForm}>
                        {this.state.loggedIn ? <Redirect to="/establishments"/> : ''}

                        <input type="text" placeholder="Usuario" ref={this.userInput}/>
                        <input type="password" placeholder="Contraseña" ref={this.passwordInput}/>

                        <button type="submit">Click</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;
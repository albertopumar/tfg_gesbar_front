import React from "react";
import {Redirect} from 'react-router-dom'
import "./LoginForm.scss"

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
                        type: res.type,
                        data: res,
                        timestamp: timestamp,
                    };
                    sessionStorage.setItem('credentials', JSON.stringify(object));

                    this.setState({loggedIn: res.type});
                }
            });
    };

    render() {
        return (
            <div className="login-wrapper">
                <div className="login">
                    <h1>Login</h1>
                    <form onSubmit={this.processForm}>
                        {this.state.loggedIn === 'owner' ? <Redirect to="/establishments"/> : ''}
                        {this.state.loggedIn === 'client' ? <Redirect to="/orders"/> : ''}

                        <input type="text" placeholder="Usuario" ref={this.userInput}/>
                        <input type="password" placeholder="Contraseña" ref={this.passwordInput}/>

                        <button type="submit" className="btn btn-primary btn-block btn-large">Enviar</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;
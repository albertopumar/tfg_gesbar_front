import React from "react";
import {Redirect} from 'react-router-dom'
import "./RegisterForm.scss"
import {CSSTransition} from "react-transition-group"

class RegisterForm extends React.Component {

    state = {
        showError: false,
        formsError: false
    };

    userInput = React.createRef();
    passwordInput = React.createRef();
    emailInput = React.createRef();
    typeInput = React.createRef();

    processForm = (event) => {
        event.preventDefault();

        this.setState({
            showError: false,
            formsError: false
        });

        const user = this.userInput.value.value;
        const password = this.passwordInput.value.value;
        const email = this.emailInput.value.value;
        const type = this.typeInput.value.value;

        const register = {
            username: user,
            password: password,
            email: email,
            type: type
        };

        // TODO: Modify response
        fetch('http://localhost:7777/register', {
            body: JSON.stringify(register),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
            .then(response => response.json())
            .then(res => {
                if (res.errmsg !== undefined) {
                    this.setState({showError: true});
                } else if (res.errors !== undefined) {
                    this.setState({formsError: true});
                } else {
                    this.props.history.push('/login');
                }
            });
    };

    render() {
        const userType = localStorage.getItem('credentials') === null ? '' : JSON.parse(localStorage.getItem('credentials')).type;
        return (
            <div className="register-wrapper">
                <div className="register">
                    <h1>Register</h1>
                    <form onSubmit={this.processForm}>
                        {userType === 'owner' ? <Redirect to="/establishments"/> : ''}
                        {userType === 'client' ? <Redirect to="/orders"/> : ''}

                        <input type="email" placeholder="Email" ref={this.emailInput}/>
                        <input type="text" placeholder="Usuario" ref={this.userInput}/>
                        <select ref={this.typeInput} className="form-control">
                            <option value="owner">Dueño</option>
                            <option value="client">Cliente</option>
                        </select>
                        <input type="password" placeholder="Contraseña" ref={this.passwordInput}/>
                        <button type="submit" className="btn btn-primary btn-block btn-large">Enviar</button>

                        {
                            this.state.formsError ?
                                <p className="error-message">Ha ocurrido un error. Introduzca los datos correctamente.</p> :
                                ''
                        }

                        {
                            this.state.showError ?
                                <p className="error-message">Ha ocurrido un error. Usuario en uso.</p> :
                                ''
                        }
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterForm;
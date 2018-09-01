import React from "react"
import {Link, withRouter} from 'react-router-dom';

class Navigation extends React.Component {

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login');
    };

    login = () => {
        this.props.history.push('/login');
    };

    render() {
        const credentials = JSON.parse(localStorage.getItem('credentials'));
        let isOwner = '';
        if (credentials)
            isOwner = credentials.type;

        return (
            <div className="bg-light sticky-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand" to="/">
                            GesBar
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#menuNavbar"
                                aria-controls="menuNavbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="menuNavbar">
                            <ul className="navbar-nav mr-auto">
                                    {
                                        isOwner === 'owner'  ?
                                            <React.Fragment>
                                                <li className="nav-item active">
                                                    <Link className="nav-link" to="/establishments">
                                                        Establecimientos
                                                    </Link>
                                                </li>
                                            </React.Fragment>:
                                            ''
                                    }

                                {
                                    isOwner === 'client'  ?
                                        <React.Fragment>
                                            <li className="nav-item active">
                                                <Link className="nav-link" to="/orders">
                                                    Pedidos
                                                </Link>
                                            </li>
                                            <li className="nav-item active">
                                                <Link className="nav-link" to="/establishment/list">
                                                    Nuevo pedido
                                                </Link>
                                            </li>
                                        </React.Fragment>:
                                        ''
                                }
                            </ul>
                            <div className="form-inline my-2 my-md-0">
                                {localStorage.getItem('credentials') === null ?
                                    <button className="btn btn-primary" onClick={this.login}>
                                    Login
                                    </button> :
                                    <button className="btn btn-primary" onClick={this.logout}>
                                    Logout
                                    </button>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default withRouter(Navigation);
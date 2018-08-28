import React from "react"
import {Link, withRouter} from 'react-router-dom';

class Navigation extends React.Component {

    logout = () => {
        sessionStorage.clear();
        this.props.history.push('/login');
    };

    login = () => {
        this.props.history.push('/login');
    };

    render() {
        return (
            <div className="bg-light sticky-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand" to="/">
                            Navbar
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#menuNavbar"
                                aria-controls="menuNavbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="menuNavbar">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/establishments">
                                        Establecimientos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Link
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="menu-ropdown"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                    <div className="dropdown-menu" aria-labelledby="menu-dropdown">
                                        <a className="dropdown-item" href="/">Action</a>
                                        <a className="dropdown-item" href="/">Another action</a>
                                        <a className="dropdown-item" href="/">Something else here</a>
                                    </div>
                                </li>
                            </ul>
                            <div className="form-inline my-2 my-md-0">
                                {sessionStorage.getItem('credentials') === null ?
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
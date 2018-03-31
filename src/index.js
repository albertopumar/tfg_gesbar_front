import React from 'react';
import { render } from 'react-dom';
import AddMenuItem from './components/AddMenuItem/AddMenuItem'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from "./components/LoginForm/LoginForm";
import EstablishmentList from "./components/EstablishmentList/EstablishmentList";

const isAuth = () => {
    if(sessionStorage.getItem('credentials')) {
        const credentials = JSON.parse(sessionStorage.getItem('credentials'));
        return credentials.type;
    }
    else
        return false;
};

const OwnerRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuth() === 'owner'
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);


// TODO: Add App wrapper
render(
    <Router>
        <Switch>
            <Route path="/login" component={LoginForm} />

            { /* Only Owner can access those Routes */ }
            <OwnerRoute path="/menu" component={AddMenuItem} />
            <OwnerRoute path="/establishments" component={EstablishmentList} />
        </Switch>
    </Router>
    , document.querySelector('#main'));

import React from "react"
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navigation from "../Navigation/Navigation";

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import EstablishmentList from "../EstablishmentList/EstablishmentList";
import MenuList from "../MenuList/MenuList";
import MenuItemList from "../MenuItemList/MenuItemList";

import AddMenuItem from '../AddMenuItem/AddMenuItem'
import OrderList from "../OrderList/OrderList";
import AllEstablishment from "../AllEstablishment/AllEstablishment";
import SubmitOrder from "../SubmitOrder/SubmitOrder";

const isAuth = () => {
    if (sessionStorage.getItem('credentials')) {
        const credentials = JSON.parse(sessionStorage.getItem('credentials'));
        return credentials.type;
    }
    else
        return false;
};

const OwnerRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        isAuth() === 'owner'
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
);

const ClientRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        isAuth() === 'client'
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
);

class App extends React.Component{
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navigation history={this.props.history}/>
                        <Switch>
                            <Route path="/login" component={LoginForm}/>
                            <Route path="/register" component={RegisterForm}/>

                            {/* Only Owner can access those Routes */}
                            <OwnerRoute path="/establishments" component={EstablishmentList}/>
                            <OwnerRoute path="/establishment/:establishmentId/menus" component={MenuList}/>
                            <OwnerRoute path="/establishment/:establishmentId/orders" component={OrderList}/>
                            <OwnerRoute path="/establishment/:establishmentId/menu/:menuId/products" component={MenuItemList}/>
                            <OwnerRoute path="/establishment/:establishmentId/menu/:menuId/updateProducts" component={AddMenuItem}/>

                            {/* Only Client can access those Routes */}
                            <ClientRoute path="/orders" component={OrderList}/>
                            <ClientRoute path="/establishment/list" component={AllEstablishment}/>
                            <ClientRoute path="/submitOrder/:establishmentId" component={SubmitOrder}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
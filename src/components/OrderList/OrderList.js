import React from "react";
import "./OrderList.scss"
import ApiProvider from "../../providers/ApiProvider";
import OrderItem from "../OrderItem/OrderItem";

class OrderList extends React.Component {

    state = {
        isOwner: false,
        pending: [],
        history: []
    };

    componentWillMount() {
        const credentials = JSON.parse(sessionStorage.getItem('credentials'));
        const isOwner = credentials.type === 'owner';
        this.setState({isOwner: isOwner});

        ApiProvider.get('orders?status=pending').then((res) => {
            this.setState({
                pending: res
            });
        });

        if (!isOwner) {
            ApiProvider.get('orders').then((res) => {
                this.setState({
                    history: res
                });
            });
        }
    }

    searchEstablishment = (event) => {
        event.preventDefault();
        this.props.history.push(`/establishment/list`);
    };

    render() {
        return (
            <div className="order-list">
                <h2>Pedidos en proceso</h2>
                <div className="container">
                    {this.state.pending.map((order) => {
                        return <OrderItem key={order._id} order={order} isOwner={this.state.isOwner}/>
                    })}
                </div>

                {
                    this.state.isOwner ?
                        '' :

                        <React.Fragment>
                            <h2>Pedidos terminados</h2>
                            <div className="container">
                                {this.state.history.map((order) => {
                                    return <OrderItem key={order._id} order={order}/>
                                })}
                            </div>

                            <button className="btn btn-primary btn-large" onClick={this.searchEstablishment}>Realizar
                                pedido
                            </button>
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default OrderList;
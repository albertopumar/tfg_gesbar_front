import React from "react";
import "./OrderList.scss"
import ApiProvider from "../../providers/ApiProvider";
import OrderItem from "../OrderItem/OrderItem";

class OrderList extends React.Component {

    state = {
        needUpdate: false,
        isOwner: false,
        pending: [],
        history: [],
        ready: [],
        collected: []
    };

    componentWillMount() {
        const credentials = JSON.parse(localStorage.getItem('credentials'));
        const isOwner = credentials.type === 'owner';
        this.setState({isOwner: isOwner});

        ApiProvider.get('orders?status=pending').then((res) => {
            this.setState({
                pending: res
            });
        });

        if (isOwner) {
            ApiProvider.get('orders?status=ready').then((res) => {
                this.setState({
                    ready: res
                });
            });

            ApiProvider.get('orders?status=collected').then((res) => {
                this.setState({
                    collected: res
                });
            });
        } else {
            ApiProvider.get('orders').then((res) => {
                this.setState({
                    history: res
                });
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const credentials = JSON.parse(localStorage.getItem('credentials'));
        const isOwner = credentials.type === 'owner';

        if(nextState.needUpdate === true) {
            ApiProvider.get('orders?status=pending').then((res) => {
                this.setState({
                    pending: res,
                    needUpdate: false
                });
            });

            if (isOwner) {
                ApiProvider.get('orders?status=ready').then((res) => {
                    this.setState({
                        ready: res,
                        needUpdate: false
                    });
                });

                ApiProvider.get('orders?status=collected').then((res) => {
                    this.setState({
                        collected: res,
                        needUpdate: false
                    });
                });
            }
        }
    }

    searchEstablishment = (event) => {
        event.preventDefault();
        this.props.history.push(`/establishment/list`);
    };

    needUpdate = () => {
        this.setState({needUpdate: true});
    };


    render() {
        return (
            <div className="order-list">
                <h2>Pedidos en proceso</h2>
                <div className="container">
                    {this.state.pending.map((order) => {
                        return <OrderItem key={order._id} order={order} isOwner={this.state.isOwner} needUpdate={this.needUpdate}/>
                    })}
                </div>
                {
                    this.state.isOwner ?
                        <React.Fragment>
                            <h2>Pedidos listos para recoger</h2>
                            <div className="container">
                                {this.state.ready.map((order) => {
                                    return <OrderItem key={order._id} order={order} isOwner={this.state.isOwner} needUpdate={this.needUpdate}/>
                                })}
                            </div>

                            <h2>Pedidos completados</h2>
                            <div className="container">
                                {this.state.collected.map((order) => {
                                    return <OrderItem key={order._id} order={order} isOwner={this.state.isOwner} needUpdate={this.needUpdate}/>
                                })}
                            </div>
                        </React.Fragment>
                         :

                        <React.Fragment>
                            <h2>Pedidos terminados</h2>
                            <div className="container">
                                {this.state.history.map((order) => {
                                    return <OrderItem key={order._id} order={order}/>
                                })}
                            </div>

                            <button className="btn btn-primary btn-large new-order" onClick={this.searchEstablishment}>Realizar
                                pedido
                            </button>
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default OrderList;
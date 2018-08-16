import React from "react";
import "./OrderList.scss"
import ApiProvider from "../../providers/ApiProvider";

class OrderList extends React.Component {

    state = {
        pending: [],
        history: []
    };

    componentWillMount() {
        ApiProvider.get('orders').then((res) => {
            this.setState({
                pending: res
            });
        })
    }

    searchEstablishment = (event) => {
        event.preventDefault();
        this.props.history.push(`/establishment/list`);
    };

    formatOrder = (products) => {
        const result = products.map((product) => {
            return product.name + ': ' + Object.keys(product.options).map((option_key) => {
                return product.options[option_key];
            });
        });
        return result[0];
    };

    render() {
        return (
            <div className="order-list">
                <div className="container">
                    {this.state.pending.map((order) => {
                        return (
                            <div key={order._id} className="row align-items-center">
                                <div className="col-md-6">
                                    <h2>{new Date(order.date).toLocaleDateString('es-ES')}</h2>
                                    <p>{this.formatOrder(order.products)}</p>
                                </div>
                                <div className="col-md-4 offset-md-2">
                                    <button className="btn btn-primary btn-large">Ver pedido</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="btn btn-primary btn-large" onClick={this.searchEstablishment}>Realizar pedido
                </button>
            </div>
        )
    }
}

export default OrderList;
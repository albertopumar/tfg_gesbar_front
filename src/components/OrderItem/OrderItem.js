import React from "react";
import ApiProvider from "../../providers/ApiProvider";

class OrderItem extends React.Component {

    state = {
        showInfo: false
    };

    showInfo = () => {
        this.setState({showInfo: true});
    };

    hideInfo = () => {
        this.setState({showInfo: false});
    };

    formatOrder = (products) => {
        const result = products.map((product) => {
            let result = product.name;

            if (product.options) {
                result += ': ' + Object.keys(product.options).map((option_key) => {
                    return product.options[option_key];
                });
            }

            return result;
        });
        return result.join(" / ");
    };

    updateStatus = (event) => {
        event.preventDefault();

        ApiProvider.get(`order/${this.props.order._id}/update?status=${event.target.value}`).then(res => {
            console.log(res);
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h2>
                            <span>{new Date(this.props.order.date).toLocaleDateString('es-ES')}</span><span>{this.props.order.status}</span>
                        </h2>
                        <p>{this.formatOrder(this.props.order.products)}</p>
                    </div>
                    <div className="col-md-4 offset-md-2">
                        <button className="btn btn-primary btn-large" onClick={this.showInfo}>Ver pedido</button>
                    </div>
                </div>
                {
                    this.state.showInfo ?
                        (
                            <div className="order-item-popup">
                                <span className="close-add-item" onClick={this.hideInfo}>x</span>
                                <div className="order-info">
                                    <p>{this.props.order.date}</p>
                                    <p>{this.props.order.status}</p>
                                    <div>
                                        {this.props.order.products.map((product) => {
                                            return <div key={product._id}>
                                                <p>{product.name}</p>
                                                <p>{product.quantity} x {product.price} €</p>
                                                <ul>
                                                    {Object.keys(product.options).map((option) => {
                                                        return <li key={option}>{option}: {product.options[option]}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) :
                        ''
                }

                {
                    this.props.isOwner ?
                        <select onChange={this.updateStatus}>
                            <option value="pending">Pendiente</option>
                            <option value="ready">Listo para recoger</option>
                            <option value="recogido">Recogido</option>
                        </select> :
                        ''
                }

            </React.Fragment>
        );
    }
}

export default OrderItem;
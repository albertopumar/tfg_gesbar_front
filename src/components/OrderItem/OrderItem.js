import React from "react";
import ApiProvider from "../../providers/ApiProvider";
import "./OrderItem.scss";

class OrderItem extends React.Component {

    state = {
        showInfo: false,
        establishmentName: '',
        clientName: ''
    };

    showInfo = () => {
        ApiProvider.get(`establishments/${this.props.order.establishment}`).then(establishment => {
            ApiProvider.get(`user/${this.props.order.user}`).then(client => {
                this.setState({
                    showInfo: true,
                    establishmentName: establishment[0].name,
                    clientName: client.name
                });
            });
        });
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
            this.props.needUpdate();
        });
    };

    mapStatus (status) {
        const mapper = {
            pending: 'Pendiente',
            ready: 'Listo para recoger',
            collected: 'Recogido'
        }

        return mapper[status];
    }

    render() {
        return (
            <React.Fragment>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h2>
                            <span>{new Date(this.props.order.date).toLocaleDateString('es-ES')}</span> <span>({this.mapStatus(this.props.order.status)})</span>
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
                                <span className="close-order-popup" onClick={this.hideInfo}>x</span>
                                <div className="order-info">
                                    <p className="establishment-name">Pedido realizado en {this.state.establishmentName} {this.state.clientName ? <React.Fragment>por <strong>{this.state.clientName}</strong></React.Fragment> : ''} </p>
                                    <p className="order-date">Pedido realizado el día {new Date(this.props.order.date).toLocaleDateString('es-ES')} a las {new Date(this.props.order.date).toLocaleTimeString('es-ES')}</p>

                                    {this.props.order.deliveryDate ?
                                        <p className="order-date">Pedido recogido el
                                            día {new Date(this.props.order.deliveryDate).toLocaleDateString('es-ES')} a
                                            las {new Date(this.props.order.deliveryDate).toLocaleTimeString('es-ES')}</p> :
                                        ''
                                    }
                                    <p className="order-status">Estado: {this.mapStatus(this.props.order.status)}</p>
                                    <p className="order-notes">Notas: {this.props.order.notes}</p>

                                    <h3>Productos:</h3>

                                    <div className="products-info">
                                        {this.props.order.products.map((product) => {
                                            return <div key={product._id}>
                                                <p>
                                                    <span className="product-name">{product.name}</span>
                                                    <span className="product-price">{product.quantity} x {product.price} €</span>
                                                </p>
                                                {product.options ?
                                                    <ul>
                                                        {Object.keys(product.options).map((option) => {
                                                            return <li
                                                                key={option}>{option}: {product.options[option]}</li>
                                                        })}
                                                    </ul> :
                                                    ''
                                                }
                                            </div>
                                        })}
                                    </div>
                                    <p className="total-price">Precio total: {this.props.order.totalPrice} €</p>
                                </div>
                            </div>
                        ) :
                        ''
                }

                {
                    this.props.isOwner ?
                        <React.Fragment>
                            <label>Estado: </label>
                            <select onChange={this.updateStatus} value={this.props.order.status}>
                                <option value="pending">Pendiente</option>
                                <option value="ready">Listo para recoger</option>
                                <option value="collected">Recogido</option>
                            </select>
                        </React.Fragment>:
                        ''
                }

            </React.Fragment>
        );
    }
}

export default OrderItem;
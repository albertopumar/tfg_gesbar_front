import React from "react";
import "./SubmitOrder.scss";
import ApiProvider from "../../providers/ApiProvider";
import MenuItem from "../MenuItem/MenuItem";

class SubmitOrder extends React.Component {

    notesRef = React.createRef();
    state = {
        menus: [],
        order: {
            notes: String,
            establishment: String,
            products: []
        }
    };

    componentWillMount() {
        ApiProvider.get(`submitOrder/${this.props.match.params.establishmentId}`).then(res => {
            const order = this.state.order;
            order.establishment = this.props.match.params.establishmentId;
            this.setState({
                menus: res,
                order: order
            });
        });
    }

    submitOrder = () => {
        let order = this.state.order;
        order.notes = this.notesRef.value.value;
        let products = order.products ? order.products : [];

        order.products = products.filter(product => {
            return product.quantity !== "";
        });

        this.setState({
            order: order
        });

        ApiProvider.post('orders', order).then(res => {
            console.log(res);
            this.props.history.push('/orders');
        });
    };

    addOrder = (product_id, quantity, price, options) => {
        let order = this.state.order;
        let products = order.products ? order.products : [];

        if (!quantity || quantity === "0") {
            products = products.filter( product => {
                return product.product !== product_id;
            } );
        } else {
            let result = products.find(product => {
                if (product.product === product_id) {
                    product.quantity = quantity;
                    product.options = options;
                    product.price = price;
                    return true
                }
                return false;
            });
            if (!result) {
                products.push(
                    {
                        quantity: quantity,
                        price: price,
                        product: product_id,
                        options: options
                    }
                );
            }
        }

        order.products = products;
        this.setState({
            order: order
        });
    };

    render() {
        return (
            <div className="menu-list">
                <div className="container">
                    {this.state.menus.map((item) => {
                        return <MenuItem
                            key={item._id ? item._id : (Math.random() + 1).toString(36).substring(24)}
                            history={this.props.history}
                            menuItem={item}
                            addOrder={this.addOrder}
                        />
                    })}
                </div>

                <div className="notes-wrapper">
                    <textarea placeholder="Notas adicionales..." ref={this.notesRef}></textarea>
                </div>
                <p className="total-price">Precio total: <TotalPrice products={this.state.order.products}/> </p>
                <button disabled={!this.state.order.products.length} className="btn btn-primary submit-order" onClick={this.submitOrder}>Realizar pedido</button>
            </div>
        )
    }
}

function TotalPrice(props) {

    if (props.products.length > 0) {
        let price = 0;
        props.products.forEach((product) => {
            price += parseFloat(product.quantity) * parseFloat(product.price);
        });
        return (price ? price.toFixed(2) : 0) + '€';
    }
    return '0€';

}

export default SubmitOrder;
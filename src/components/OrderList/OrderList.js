import React from "react";
import "./OrderList.scss"

class OrderList extends React.Component {

    state = {
        orders: [],
    };

    componentWillMount() {

    }

    removeFromState = (order) => {
        const orders = [...this.state.orders];
        const index = orders.indexOf(order);

        orders.splice(index, 1);

        this.setState({
            orders: orders
        });
    };

    createOrder = () => {
        const orders = [...this.state.orders];
        orders.push(
            {
                description: '',
                name: '',
            }
        );
        this.setState({
            orders: orders
        });
    };

    render() {
        return (
            <div className="order-list">
                This will be the order lisr
            </div>
        )
    }
}

export default OrderList;
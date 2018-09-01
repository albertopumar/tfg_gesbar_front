import React from "react";
import ApiProvider from "../../providers/ApiProvider"
import "./Establishment.scss"
import SweetAlert from "../SweetAlert/SweetAlert";

class Establishment extends React.Component {

    nameRef = React.createRef();
    descriptionRef = React.createRef();

    processForm = (event) => {
        event.preventDefault();

        const data = {
            name: this.nameRef.value.value,
            description: this.descriptionRef.value.value
        };

        if (this.props.establishment._id) {
            ApiProvider.put(`owner/establishment/${this.props.establishment._id}`, data).then(res => {
                if(!res.message) {
                    this.props.showSuccess();
                }
            });
        } else {
            ApiProvider.post('owner/establishment', data).then(res => {
                if(!res.message) {
                    this.props.showSuccess();
                }
            });
        }
    };

    deleteEstablishment = (establishment) => {
        ApiProvider.remove(`owner/establishment/${establishment._id}`).then(res => {
            if (!res.message) {
                this.props.removeFromState(establishment);
            }
        });
    };

    viewMenu = (event) => {
        event.preventDefault();

        this.props.history.push(`/establishment/${this.props.establishment._id}/menus`);
    };

    viewOrders = (event) => {
        event.preventDefault();

        this.props.history.push(`/establishment/${this.props.establishment._id}/orders`);
    };

    render() {

        let orders = '';
        if (this.props.establishment.orders) {
            orders = (<div className="order-count">{this.props.establishment.orders}</div>);
        }

        return (
            <div className="col-md-4">
                <form className="establishment" onSubmit={this.processForm}>
                    <input type="text" placeholder="Nombre" ref={this.nameRef} defaultValue={this.props.establishment.name}/>
                    <textarea placeholder="Descripción" ref={this.descriptionRef}
                              defaultValue={this.props.establishment.description}></textarea>

                    <button className="btn btn-success btn-block btn-large" type="submit">Guardar</button>
                    <SweetAlert disabled={!this.props.establishment._id} buttonName="Borrar" classes="btn-block btn-large" action={this.deleteEstablishment} delete={this.props.establishment}/>
                    <button disabled={!this.props.establishment._id} className="btn btn-primary btn-block btn-large" onClick={this.viewMenu}>Ver menú</button>
                    <button disabled={!this.props.establishment._id} className="btn btn-primary btn-block btn-large" onClick={this.viewOrders}>Ver Pedidos</button>

                    {orders}
                </form>
            </div>
        )
    }
}

export default Establishment;
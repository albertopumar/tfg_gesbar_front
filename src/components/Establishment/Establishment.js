import React from "react";
import ApiProvider from "../../providers/ApiProvider"
import "./Establishment.scss"

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
                // TODO: Handle error and success
                if(!res.message) {
                    this.props.showSuccess();
                }
                console.log(res);
            });
        } else {
            ApiProvider.post('owner/establishment', data).then(res => {
                // TODO: Handle error and success and update state
                console.log(res);
                if(!res.message) {
                    this.props.showSuccess();
                }
            });
        }
    };

    deleteEstablishment = (event) => {
        event.preventDefault();

        ApiProvider.remove(`owner/establishment/${this.props.establishment._id}`).then(res => {
            // TODO: Handle error and success
            this.props.removeFromState(this.props.establishment);
        });
    };

    viewMenu = (event) => {
        event.preventDefault();

        this.props.history.push(`/establishment/${this.props.establishment._id}/menus`);
    };

    render() {

        let orders = '';
        if (this.props.establishment.orders) {
            orders = (<div className="order-count">{this.props.establishment.orders.length}</div>);
        }

        return (
            <div className="col-md-4">
                <form className="establishment" onSubmit={this.processForm}>
                    <input type="text" placeholder="Nombre" ref={this.nameRef} defaultValue={this.props.establishment.name}/>
                    <textarea placeholder="Descripción" ref={this.descriptionRef}
                              defaultValue={this.props.establishment.description}></textarea>

                    <button className="btn btn-success btn-block btn-large" type="submit">Guardar</button>
                    <button className="btn btn-danger btn-block btn-large"
                            onClick={this.deleteEstablishment}>Eliminar
                    </button>
                    <button className="btn btn-primary btn-block btn-large" onClick={this.viewMenu}>Ver menú</button>
                    <button className="btn btn-primary btn-block btn-large" onClick={this.viewMenu}>Ver Pedidos</button>

                    {orders}
                </form>
            </div>
        )
    }
}

export default Establishment;
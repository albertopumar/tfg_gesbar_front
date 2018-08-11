import React from "react";
import ApiProvider from "../../providers/ApiProvider";
import SweetAlert from "../SweetAlert/SweetAlert";
import AddMenuItem from "../AddMenuItem/AddMenuItem";

import "./Menu.scss"

class Menu extends React.Component {

    nameRef = React.createRef();
    descriptionRef = React.createRef();

    state = {
        editMenu: false
    };

    processForm = (event) => {
        event.preventDefault();

        const data = {
            name: this.nameRef.value.value,
            description: this.descriptionRef.value.value
        };

        if (this.props.menu._id) {
            ApiProvider.put(`owner/establishment/${this.props.menu.establishment}/menu/${this.props.menu._id}`, data).then(res => {
                // TODO: Handle error and success
                if(!res.message) {

                }
                console.log(res);
            });
        } else {
            ApiProvider.post(`owner/establishment/${this.props.menu.establishment}/menu`, data).then(res => {
                // TODO: Handle error and success and update state
                console.log(res);
                if(!res.message) {

                }
            });
        }
    };

    deleteMenu = (menu) => {
        ApiProvider.remove(`owner/establishment/${this.props.menu.establishment}/menu/${menu._id}`).then(res => {
            // TODO: Handle error and success
            this.props.removeFromState(menu);
        });
    };

    addItem = (event) => {
        event.preventDefault();

        this.setState({editMenu: true});
    };

    closeAddItem = () => {
        this.setState({editMenu: false});
    };

    viewItem = (event) => {
        event.preventDefault();
        this.props.history.push(`/establishment/${this.props.menu.establishment}/menu/${this.props.menu._id}/products`);
    };

    render() {
        let editMenu = '';
        if(this.state.editMenu) {
            editMenu = (
                <div className="add-item-popup">
                    <span className="close-add-item" onClick={this.closeAddItem}>x</span>
                    <AddMenuItem menu={this.props.menu} />
                </div>
            );
        } else {
            editMenu = '';
        }

        return (
            <React.Fragment>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <form onSubmit={this.processForm} className="menu-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="text" placeholder="Nombre" ref={this.nameRef} defaultValue={this.props.menu.name}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <textarea placeholder="Descripción" ref={this.descriptionRef}
                                              defaultValue={this.props.menu.description}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-primary btn-large btn-block" onClick={this.viewItem}>Ver Productos</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="buttons-wrapper d-flex">
                                        <button className="btn btn-success">Guardar</button>
                                        <SweetAlert buttonName="Borrar" action={this.deleteMenu} delete={this.props.menu}/>
                                        <button className="btn btn-primary" onClick={this.addItem}>Añadir producto</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {editMenu}
            </React.Fragment>
        )
    }
}

export default Menu;
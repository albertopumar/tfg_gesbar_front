import React from "react";
import AddMenuItem from "../AddMenuItem/AddMenuItem"
import "./MenuItem.scss"

class MenuItem extends React.Component {

    state = {
        ordered: false,
        editMenu: false
    };
    quantityRef = React.createRef();
    optionsRefs = [];

    componentDidMount() {
    }

    addOrder = () => {
        this.setState({
            ordered: true,
        });
        if (this.props.menuItem.options) {
            Object.keys(this.props.menuItem.options).forEach((option) => {
                this.optionsRefs[option] = React.createRef();
            })
        }
    };

    removeOrder = () => {
        this.setState({
            ordered: false,
        });
        this.props.addOrder(this.props.menuItem._id, '', false);
        this.optionsRefs = [];
    };

    submitOrder = () => {
        let productOptions = {};
        Object.keys(this.optionsRefs).map((optionValue) => {
            return productOptions[optionValue] = this.optionsRefs[optionValue].value.value;
        });
        this.props.addOrder(this.props.menuItem._id, this.quantityRef.value.value, this.props.menuItem.price, productOptions);
    };

    editOrder = () => {
        this.setState({editMenu: true});
    };

    closeAddItem = () => {
        this.setState({editMenu: false});
    };


    render() {

        let editMenu;
        if(this.state.editMenu) {
            editMenu = (
                <div className="add-item-popup">
                    <span className="close-add-item" onClick={this.closeAddItem}>x</span>
                    <AddMenuItem menu={this.props.menu} edit={this.props.menuItem} establishmentId={this.props.establishment} success={this.closeAddItem}/>
                </div>
            );
        } else {
            editMenu = '';
        }

        const showOptions = this.props.menuItem.options ? (
            <React.Fragment>
                {Object.keys(this.props.menuItem.options).map((option) => {
                    return (
                        <div key={option} className="item-option">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                    id={`dropdown-${option}`} data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                {option}
                            </button>

                            <div className="dropdown-menu" aria-labelledby={`dropdown-${option}`}>
                                {this.props.menuItem.options[option].map((optionList) => {
                                    return (<p key={optionList} className="dropdown-item">{optionList}</p>)
                                })}
                            </div>
                        </div>
                    )
                })}
            </React.Fragment>
        ) : '';

        const selectOptions = this.props.menuItem.options ? (
            <React.Fragment>
                {Object.keys(this.props.menuItem.options).map((option) => {
                    return (
                        <div key={option} className="item-option">
                            <p>{option}</p>

                            <select ref={this.optionsRefs[option]} onChange={this.submitOrder}
                                    className="option-select">
                                {this.props.menuItem.options[option].map((optionList) => {
                                    return (<option key={optionList} value={optionList}>{optionList}</option>)
                                })}
                            </select>
                        </div>
                    )
                })}
            </React.Fragment>
        ) : '';

        const credentials = JSON.parse(sessionStorage.getItem('credentials'));
        const isAdmin = credentials.type === 'owner';

        return (
            <React.Fragment>
                <div className="row justify-content-md-center">
                    <div className="col-md-12">
                        <div className="menu-product">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-between">
                                        <h2>{this.props.menuItem.name}</h2>

                                        {this.props.addOrder && this.state.ordered === true ?
                                            selectOptions
                                            : showOptions
                                        }

                                        {this.state.ordered === true ?
                                            (<div className="order-wrapper">
                                                <input ref={this.quantityRef} onChange={this.submitOrder} type="text"/>
                                            </div>)
                                            : ''}

                                        {this.props.addOrder && this.state.ordered !== true ?
                                            (<button onClick={this.addOrder}>Comprar</button>)
                                            : ''}

                                        {this.props.addOrder && this.state.ordered === true ?
                                            (<button onClick={this.removeOrder}>Cancelar</button>)
                                            : ''}

                                        {isAdmin ? <button className="btn btn-primary" onClick={this.editOrder}>Editar</button> : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="product-description">{this.props.menuItem.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {editMenu}
            </React.Fragment>
        )
    }
}

export default MenuItem;
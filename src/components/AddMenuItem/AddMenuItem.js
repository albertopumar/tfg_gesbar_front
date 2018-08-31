import React from "react";
import ItemOptions from "../ItemOptions/ItemOptions";
import ApiProvider from "../../providers/ApiProvider";
import "./AddMenuItem.scss";

class AddMenuItem extends React.Component {

    nameInput = React.createRef();
    priceInput = React.createRef();
    descriptionInput = React.createRef();
    availabilityInput = React.createRef();

    state = {
        attributes: {},
    };

    componentWillMount() {
        if (this.props.edit) {

            if (this.props.edit.options) {
                let attributes = {...this.state.attributes};
                let attributeIndex = 0;
                Object.keys(this.props.edit.options).forEach((value) => {
                    attributeIndex++;

                    let options = {};
                    let optionIndex = 0;
                    if (this.props.edit.options) {

                        this.props.edit.options[value].forEach(
                            (option) => {
                            optionIndex++;

                            options[`options_${optionIndex}`] = {
                                ref: React.createRef(),
                                devaultOption: option,
                                placeholder: 'Añade una opción',
                            };
                        });
                    }
                    attributes[`attribute_${attributeIndex}`] = {
                        ref: React.createRef(),
                        defaultName: value,
                        options
                    };
                });
                this.setState({
                    attributes: attributes
                });
            }
        }
    }

    addOption = (attribute, event) => {
        if (event) event.preventDefault();

        const attributes = {...this.state.attributes};

        const date = Date.now() / 1000 | 0;

        attributes[attribute].options[`options_${date}`] = {
            ref: React.createRef(),
            placeholder: 'Añade una opción',
        };

        this.setState({
            attributes: attributes
        });
    };

    removeOption = (attribute, option, event) => {
        event.preventDefault();

        const attributes = {...this.state.attributes};

        delete attributes[attribute].options[option];
        this.setState({
            attributes: attributes
        });
    };

    addAttribute = (event) => {
        if (event) event.preventDefault();

        const attributes = {...this.state.attributes};

        const date = Date.now() / 1000 | 0;

        let options = {};
        options[`options_${date}`] = {
            ref: React.createRef(),
            placeholder: 'Añade una opción',
        };

        attributes[`attribute_${date}`] = {
            ref: React.createRef(),
            options
        };

        this.setState({
            attributes: attributes
        });
    };

    removeAttribute = (attribute, event) => {
        if (event) event.preventDefault();

        const attributes = {...this.state.attributes};

        delete attributes[attribute];

        this.setState({
            attributes: attributes
        });
    };

    processForm = (event) => {
        event.preventDefault();

        let data = {};

        const attributes = this.state.attributes;

        Object.keys(attributes).map((key) => {
            const typeName = attributes[key].ref.value.value;
            const options = attributes[key].options;

            return data[typeName] = Object.keys(options).map((key) => {
                return options[key].ref.value.value;
            });
        });

        let menu = {};
        menu['name'] = this.nameInput.value.value;
        menu['price'] = this.priceInput.value.value;
        menu['availability'] = this.availabilityInput.value.checked;
        menu['description'] = this.descriptionInput.value.value;
        menu['options'] = data;


        if (this.props.edit) {
            ApiProvider.put(`owner/establishment/${this.props.establishmentId}/menu/${this.props.edit.menu}/items/${this.props.edit._id}`, menu).then(res => {
                if (res._id) {
                    this.props.success();
                }
            });
        } else {
            ApiProvider.post(`owner/establishment/${this.props.menu.establishment}/menu/${this.props.menu._id}/items`, menu).then(res => {
                if (res._id) {
                    this.props.success();
                }
            });
        }

    };

    render() {
        return (
            <form className="add-item-menu" onSubmit={this.processForm}>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <input type="text" className="product-name" placeholder="Nombre del producto"
                               ref={this.nameInput}
                               defaultValue={this.props.edit ? this.props.edit.name : ''}/>

                        <input type="text" placeholder="Precio del producto" ref={this.priceInput}
                               defaultValue={this.props.edit ? this.props.edit.price : ''}/>

                        <label>Disponibilidad</label>
                        <input type="checkbox" ref={this.availabilityInput} defaultChecked={this.props.edit ? this.props.edit.availability : false} />

                        <textarea placeholder="Descripción del producto" ref={this.descriptionInput}
                                  defaultValue={this.props.edit ? this.props.edit.description : ''}></textarea>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-4">
                        {Object.keys(this.state.attributes).map(key =>
                            <ItemOptions key={key}
                                         options={this.state.attributes[key].options}
                                         attribute={key}
                                         nameRef={this.state.attributes[key].ref}
                                         removeAttribute={this.removeAttribute}
                                         addOption={this.addOption}
                                         removeOption={this.removeOption}

                                         nameDefaultValue={this.state.attributes[key].defaultName}
                            />
                        )}
                        <button className="btn btn-primary btn-block add-product-attribute"
                                onClick={this.addAttribute}>Añadir Atributo
                        </button>

                        <button className="btn btn-success btn-block " type="submit">Guardar</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddMenuItem;
import React from "react";
import ItemOptions from "../ItemOptions/ItemOptions";
import ApiProvider from "../../providers/ApiProvider";

class AddMenuItem extends React.Component {

    nameInput = React.createRef();
    state = {
        attributes: {

        },
    };

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

        //TODO: Check return
        Object.keys(attributes).map((key) => {
            const typeName = attributes[key].ref.value.value;
            const options = attributes[key].options;

            return data[typeName] = Object.keys(options).map((key) => {
                return options[key].ref.value.value;
            });
        });


        let menu = {};
        menu['name'] = this.nameInput.value.value;

        let menuItems = {};
        menuItems[this.nameInput.value.value] = data;
        menu['items'] = menuItems;

        //TODO: Set stablishment
        ApiProvider.post(`owner/establishment/${this.props.menu.establishment}/menu/${this.props.menu._id}/items`, menu).then(res => {
            // TODO: Handle error and success
            console.log(res);
        });

    };

    render() {
        return (
            <form className="add-item-menu" onSubmit={this.processForm}>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <input type="text" className="product-name" placeholder="Nombre del producto" ref={this.nameInput}/>
                        <input type="text" placeholder="Precio del producto"/>
                        <textarea placeholder="Descripción del producto"></textarea>
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
                                         removeOption={this.removeOption}/>
                        )}
                        <button className="btn btn-primary btn-block add-product-attribute" onClick={this.addAttribute}>Añadir Atributo</button>

                        <button className="btn btn-success btn-block " type="submit">Guardar</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddMenuItem;
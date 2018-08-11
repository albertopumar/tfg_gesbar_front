import React from "react";
import ItemOptions from "../ItemOptions/ItemOptions";
import ApiProvider from "../../providers/ApiProvider";

class AddMenuItem extends React.Component {

    nameInput = React.createRef();
    state = {
        attributes: {
            attribute: {
                ref: React.createRef(),
                options: {}
            }
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
                    <div className="col-md-4">
                        <input type="text" placeholder="Nombre del producto" ref={this.nameInput}/>

                        {Object.keys(this.state.attributes).map(key =>
                            <div key={key}>
                                <ItemOptions addOption={this.addOption} removeOption={this.removeOption}
                                             options={this.state.attributes[key].options} attribute={key} nameRef={this.state.attributes[key].ref}/>

                                <button onClick={(event) => this.removeAttribute(key, event)}>Remove Attribute</button>
                            </div>
                        )}

                        <button className="btn btn-primary" type="submit">Click</button>
                        <button className="btn btn-primary" onClick={this.addAttribute}>Add Attribute</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddMenuItem;
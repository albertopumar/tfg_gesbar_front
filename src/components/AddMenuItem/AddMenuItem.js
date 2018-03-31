import React from "react";
import ItemOptions from "../ItemOptions/ItemOptions";
import classnames from "classnames";

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

        console.log(JSON.stringify(data));


        fetch('http://localhost:7777/api/V1/establishment/1/menu/', {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
            .then(response => response.json())
            .then(res => console.log(res));

    };

    render() {
        return (
            <form className={classnames('test')} onSubmit={this.processForm}>
                <input type="text" placeholder="Nombre del producto" ref={this.nameInput}/>

                {Object.keys(this.state.attributes).map(key =>
                    <div key={key}>
                        <ItemOptions addOption={this.addOption} removeOption={this.removeOption}
                             options={this.state.attributes[key].options} attribute={key} nameRef={this.state.attributes[key].ref}/>

                        <button onClick={(event) => this.removeAttribute(key, event)}>Remove Attribute</button>
                    </div>
                )}

                <button type="submit">Click</button>

                <button onClick={this.addAttribute}>Add Attribute</button>
            </form>
        )
    }
}

export default AddMenuItem;
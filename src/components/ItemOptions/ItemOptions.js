import React from "react";

class AddMenuItem extends React.Component {

    render() {
        return (
            <div className="item-options">
                <input type="text" placeholder="Nombre de la opción del producto" ref={this.props.nameRef}/>
                <div className="options-wrapper">

                    {Object.keys(this.props.options).map(option =>
                        <div key={option} className={`option${option}`}>
                            <input type="text" placeholder={this.props.options[option].placeholder} ref={this.props.options[option].ref}/>
                            <button className="test" onClick={(event) => this.props.removeOption(this.props.attribute, option, event)}>Remove</button>
                        </div>
                    )}

                    <button onClick={(event) => this.props.addOption(this.props.attribute, event)}>Add Option</button>
                </div>
            </div>
        )
    }
}

export default AddMenuItem;
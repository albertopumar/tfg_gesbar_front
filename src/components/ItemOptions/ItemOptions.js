import React from "react";

class AddMenuItem extends React.Component {

    render() {
        return (
            <div className="item-options">
                <div className="product-option-wrapper">
                    <span onClick={(event) => this.props.removeAttribute(this.props.attribute, event)}>x</span>
                    <input type="text" placeholder="Nombre de la opción del producto" ref={this.props.nameRef}/>
                </div>
                <div className="options-wrapper">

                    {Object.keys(this.props.options).map(option =>
                        <div key={option} className={option}>
                            <span className="test"
                                  onClick={(event) => this.props.removeOption(this.props.attribute, option, event)}>x</span>
                            <input type="text" placeholder={this.props.options[option].placeholder}
                                   ref={this.props.options[option].ref}/>
                        </div>
                    )}

                    <button className="btn btn-info add-option-button"
                            onClick={(event) => this.props.addOption(this.props.attribute, event)}>Añadir Opción
                    </button>
                </div>
            </div>
        )
    }
}

export default AddMenuItem;
import React from "react";
import SweetAlert from "../SweetAlert/SweetAlert";

import "./MenuItem.scss"

class MenuItem extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-6 d-flex justify-content-between">
                    <h2>Nombre: {this.props.menuItem.name}</h2>
                    {Object.keys(this.props.menuItem.options).map((option) => {
                        return (
                            <div className="item-option">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        id={`dropdown-${option}`} data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    {option}
                                </button>

                                <div className="dropdown-menu" aria-labelledby={`dropdown-${option}`}>
                                    {this.props.menuItem.options[option].map((optionList) => {
                                        return (<p className="dropdown-item">{optionList}</p>)
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default MenuItem;
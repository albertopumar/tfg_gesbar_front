import React from "react";
import Establishment from "../Establishment/Establishment";
import {apiGet} from "../../providers/ApiProvider";

class EstablishmentList extends React.Component {

    state = {
        establishments: []
    };

    componentWillMount() {

        apiGet('owner/establishment').then(res => {
            this.setState({establishments: res})
        });

    }

    createEstablishment = () => {
        const establishments = [...this.state.establishments];
        establishments.push(
            {
                description: '',
                name: '',
            }
        );
        this.setState({
            establishments: establishments
        });
    };


    render() {
        return (
            <div className="establishment-list">
                {this.state.establishments.map((establishment) => {
                    return <Establishment key={establishment._id} id={establishment._id} name={establishment.name}
                                          description={establishment.description}/>
                })}
                <button onClick={this.createEstablishment}>Crear Establecimiento</button>
            </div>
        )
    }
}

export default EstablishmentList;
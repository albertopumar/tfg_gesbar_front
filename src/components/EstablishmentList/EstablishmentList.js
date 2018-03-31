import React from "react";
import Establishment from "../Establishment/Establishment";
import ApiProvider from "../../providers/ApiProvider";
import "./EstablishmentList.scss"

class EstablishmentList extends React.Component {

    state = {
        establishments: []
    };

    componentWillMount() {

        ApiProvider.get('owner/establishment').then(res => {
            this.setState({establishments: res})
        });

    }

    removeFromState = (establishment) => {
        const establishments = [...this.state.establishments];
        const index = establishments.indexOf(establishment);

        establishments.splice(index, 1);

        this.setState({
            establishments: establishments
        });
    };

    createEstablishment = () => {
        const establishments = [...this.state.establishments];
        establishments.push(
            {
                _id: Math.random(),
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
                <div className="container">
                    <div className="row">
                        {this.state.establishments.map((establishment) => {
                            return <Establishment key={establishment._id} history={this.props.history} establishment={establishment} removeFromState={this.removeFromState}/>
                        })}
                        <div className="col-md-4">
                            <button className="create-establishment-button" onClick={this.createEstablishment}>Crear Establecimiento</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EstablishmentList;
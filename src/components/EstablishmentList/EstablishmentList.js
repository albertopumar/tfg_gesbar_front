import React from "react";
import {CSSTransition} from "react-transition-group"
import Establishment from "../Establishment/Establishment";
import ApiProvider from "../../providers/ApiProvider";
import RNEventSource from "react-native-event-source";
import "./EstablishmentList.scss"

class EstablishmentList extends React.Component {

    state = {
        establishments: [],
        showSuccess: false,
    };

    componentWillMount() {

        ApiProvider.get('owner/establishment').then(res => {
            this.setState({establishments: res})
        });

    }

    componentDidMount() {

        const credentials = JSON.parse(sessionStorage.getItem('credentials'));
        this.eventSource = new RNEventSource('http://localhost:7777/api/V1/events/establishment', {
            headers: {
                'Authorization': `Bearer ${credentials.data.access_token}`
            }
        });

        this.eventSource.addEventListener('message', (data) => {
            const object = JSON.parse(data.data);
            Object.keys(object).map((key) => {
                if (object[key].orders) {
                    let establishments = [...this.state.establishments];

                    let found = establishments.find(function(element) {
                        return element['_id'] === object[key]._id;
                    });
                    const index = establishments.indexOf(found);

                    establishments[index].orders = object[key].orders;

                    this.setState({
                        establishments: establishments
                    });

                    return true;
                }
                return false;
            });
        });
    }

    componentWillUnmount() {
        this.eventSource.removeAllListeners();
        this.eventSource.close();
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
                description: '',
                name: '',
            }
        );
        this.setState({
            establishments: establishments
        });
    };

    showSuccess = () => {
        this.setState({
            showSuccess: true
        });
    };

    render() {
        return (
            <div className="establishment-list">
                <div className="container">
                    <div className="row">
                        {this.state.establishments.map((establishment) => {
                            return <Establishment
                                key={
                                    establishment._id ?
                                        establishment._id
                                        : (Math.random() + 1).toString(36).substring(24)
                                }
                                history={this.props.history}
                                establishment={establishment}
                                removeFromState={this.removeFromState}
                                showSuccess={this.showSuccess} />
                        })}
                        <div className="col-md-4">
                            <button className="create-establishment-button" onClick={this.createEstablishment}>
                                Crear Establecimiento
                            </button>
                        </div>
                    </div>
                </div>
                <CSSTransition
                    in={this.state.showSuccess}
                    timeout={{enter: 1500, exit: 500}}
                    classNames="success-popup"
                    unmountOnExit
                    onEntered={() => {
                        this.setState({
                            showSuccess: false
                        })
                    }}>
                    <div className="success-popup">Success</div>
                </CSSTransition>
            </div>
        )
    }
}

export default EstablishmentList;
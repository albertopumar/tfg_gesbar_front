import React from "react";
import ApiProvider from "../../providers/ApiProvider";
import "./AllEstablishment.scss"

class AllEstablishment extends React.Component {

    state = {
        establishments: [],
        page: Number,
        lastPage: false
    };
    searchRef = React.createRef();

    componentWillMount() {

        ApiProvider.get('establishments').then(res => {
            this.setState({
                establishments: res,
                page: 0
            })
        });

    }

    componentWillUpdate(nextProps, nextState) {

        if(this.state.search !== nextState.search) {
            ApiProvider.get(`establishments?search=${nextState.search}&page=0`).then(res => {
                this.setState({
                    establishments: res,
                    page: 0
                })
            });
        } else if(this.state.page !== nextState.page) {

            let uri = 'establishments?';
            if(nextState.search)
                uri += `search=${nextState.search}&`;
            uri += `page=${nextState.page}`;

            ApiProvider.get(uri).then(res => {
                if (!res.length) {
                    this.setState({
                        page: this.state.page - 1,
                        lastPage: true
                    });
                } else {
                    this.setState({establishments: res});
                }
            });
        }
    }

    loadEstablishments = (event) => {
        event.preventDefault();
        this.setState({search: this.searchRef.value.value});
    };

    prevPage = () => {
        this.setState({
            page: this.state.page - 1,
            lastPage: false
        });
    };

    nextPage = () => {
        this.setState({page: this.state.page + 1});
    };

    showMenu = (establishment_id, event) => {
        event.preventDefault();

        this.props.history.push(`/submitOrder/${establishment_id}`);
    };

    render() {
        return (
            <div className="establishment-list">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <form className="search-establishment" onSubmit={this.loadEstablishments}>
                                <input type="text" placeholder="Nombre" ref={this.searchRef} />
                            </form>
                        </div>
                    </div>

                    {this.state.establishments.map((establishment) => {
                        return (
                            <div className="row"
                                 key={establishment._id ? establishment._id : (Math.random() + 1).toString(36).substring(24)}>
                                <div className="col-md-12 d-flex justify-content-between">
                                    <h2 className="establishment-name">{establishment.name}</h2>
                                    <button className="btn btn-primary show-menu-button" onClick={(event) => this.showMenu(establishment._id, event)}>Ver Menú</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-11 offset-md-1">
                            <button disabled={!this.state.page} className="btn btn-light prev-button" onClick={this.prevPage}>Anterior</button>
                            <button disabled={this.state.lastPage} className="btn btn-light next-button" onClick={this.nextPage}>Siguiente</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllEstablishment;
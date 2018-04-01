import React from "react";
import "./MenuList.scss"
import ApiProvider from "../../providers/ApiProvider"

class MenuList extends React.Component {

    state = {
        menus: []
    };

    componentWillMount() {

        const {match: {params}} = this.props;

        console.log(params);
        ApiProvider.get(`establishment/${params.establishmentId}/menu`).then(res => {
            this.setState({menus: res})
        });

    }

    render() {
        return (
            <div className="menu-list">
                <div className="container">
                    {this.state.menus.map((menu) => {
                        return (
                            <div className="row justify-content-md-center">
                                <div className="col-md-6">
                                    <div className="menu-container">
                                        <h2>{menu.name}</h2>
                                        <button className="btn btn-primary">Borrar</button>
                                        <button className="btn btn-primary">Editar</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default MenuList;
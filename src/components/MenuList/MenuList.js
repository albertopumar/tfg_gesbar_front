import React from "react";
import "./MenuList.scss";
import ApiProvider from "../../providers/ApiProvider";
import Menu from "../Menu/Menu";

class MenuList extends React.Component {

    state = {
        menus: []
    };

    componentWillMount() {

        const {match: {params}} = this.props;

        ApiProvider.get(`owner/establishment/${params.establishmentId}/menu`).then(res => {
            this.setState({menus: res});
        });

    }

    createMenu = () => {
        const menus = [...this.state.menus];
        menus.push(
            {
                description: '',
                name: '',
                establishment: this.props.match.params.establishmentId
            }
        );
        this.setState({
            menus: menus
        });
    };

    removeFromState = (menu) => {
        const menus = [...this.state.menus];
        const index = menus.indexOf(menu);

        menus.splice(index, 1);

        this.setState({
            menus: menus
        });
    };

    /*
        render() {
            return (
                <div className="menu-list">
                    <div className="container">
                        {this.state.menus.map((menu) => {
                            return (
                                <div className="row justify-content-md-center" key={menu._id}>
                                    <div className="col-md-6">
                                        <div className="menu-container">
                                            <h2>{menu.name}</h2>
                                            <button className="btn btn-danger">Borrar</button>
                                            <button className="btn btn-primary">Editar</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <button className="btn btn-primary btn-block" onClick={this.createMenu}>Add menu</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    */

    render() {
        return (
            <div className="menu-list">
                <div className="container">
                    {this.state.menus.map((menu) => {
                        return <Menu
                            key={menu._id ? menu._id : (Math.random() + 1).toString(36).substring(24)}
                            history={this.props.history}
                            menu={menu}
                            removeFromState={this.removeFromState}
                        />
                    })}

                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <button className="btn btn-primary btn-block" onClick={this.createMenu}>Add menu</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuList;
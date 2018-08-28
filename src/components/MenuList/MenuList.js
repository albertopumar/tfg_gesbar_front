import React from "react";
import "./MenuList.scss";
import ApiProvider from "../../providers/ApiProvider";
import Menu from "../Menu/Menu";

class MenuList extends React.Component {

    state = {
        menus: [],
        needUpdate: false
    };

    componentWillMount() {

        const {match: {params}} = this.props;
        ApiProvider.get(`owner/establishment/${params.establishmentId}/menu`).then(res => {
            this.setState({menus: res});
        });

    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.needUpdate === true) {
            const {match: {params}} = this.props;
            ApiProvider.get(`owner/establishment/${params.establishmentId}/menu`).then(res => {
                this.setState({
                    menus: res,
                    needUpdate: false
                });
            });
        }
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

    updateActiveMenu = (menu_id) => {
        const {match: {params}} = this.props;

        ApiProvider.get(`owner/establishment/${params.establishmentId}/activeMenu/${menu_id}`).then(res => {
            let menus = [...this.state.menus];

            menus.forEach((menu) => {
                if (menu._id === res._id) {
                    menu.availability = true;
                } else {
                    menu.availability = false;
                }
            });

            this.setState({menus: menus});
        });
    };

    updateMenus = () => {
        this.setState({needUpdate: true});
    };

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
                            updateActiveMenu={this.updateActiveMenu}
                            updateMenus={this.updateMenus}
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
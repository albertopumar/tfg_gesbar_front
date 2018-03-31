import React from "react";
import "./MenuList.scss"
import ApiProvider from "../../providers/ApiProvider"

class MenuList extends React.Component {

    state = {
        menus: []
    };

    componentWillMount() {

        const { match: { params } } = this.props;

        console.log(params);
        ApiProvider.get(`establishment/${params.establishmentId}/menu`).then(res => {
            this.setState({menus: res})
        });

    }

    render() {
        return (
            <div className="menu-list">
                {this.state.menus.map((menu) => {
                    return <h2>{menu.name}</h2>
                })}
            </div>
        )
    }
}

export default MenuList;
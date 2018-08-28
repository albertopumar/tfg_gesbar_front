import React from "react";
import "./MenuItemList.scss";
import ApiProvider from "../../providers/ApiProvider";
import MenuItem from "../MenuItem/MenuItem";

class MenuItemList extends React.Component {

    state = {
        items: [],
        needUpdate: false
    };

    componentWillMount() {

        const {match: {params}} = this.props;

        ApiProvider.get(`owner/establishment/${params.establishmentId}/menu/${params.menuId}/items`).then(res => {
            this.setState({items: res});
        });

    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.needUpdate === true) {
            const {match: {params}} = this.props;
            ApiProvider.get(`owner/establishment/${params.establishmentId}/menu/${params.menuId}/items`).then(res => {
                this.setState({
                    items: res,
                    needUpdate: true
                });
            });
        }
    }

    needUpdate = () => {
        this.setState({needUpdate: true});
    };

    removeFromState = (menuItem) => {
        const items = [...this.state.items];
        const index = items.indexOf(menuItem);

        items.splice(index, 1);

        this.setState({
            items: items
        });
    };

    render() {
        return (
            <div className="container">
                <div className="menu-item-list">
                    {this.state.items.map((item) => {
                        return <MenuItem
                            key={item._id ? item._id : (Math.random() + 1).toString(36).substring(24)}
                            history={this.props.history}
                            menuItem={item}
                            removeFromState={this.removeFromState}
                            establishment={this.props.match.params.establishmentId}
                            needUpdate={this.needUpdate}
                        />
                    })}
                </div>
            </div>
        )
    }
}

export default MenuItemList;
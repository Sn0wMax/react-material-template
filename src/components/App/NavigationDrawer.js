import React, { Component } from 'react';
import { Drawer, Menu, MenuItem, Divider } from 'material-ui';
import { ActionHome, ActionSettings } from 'material-ui/svg-icons';

class NavigationDrawer extends Component {
    render() {
        return (
            <Drawer open={this.props.open} containerClassName="drawerContainer" value="home">
                <Menu 
                    value={this.props.aciveNavItem}
                    onChange={(event, value) => {
                        this.props.onSelectNavItem(value);
                    }}
                >
                    <MenuItem primaryText="Home" leftIcon={<ActionHome />} value="home"/>
                    <Divider />
                    <MenuItem primaryText="Settings" leftIcon={<ActionSettings />} value="settings"/>
                </Menu>
            </Drawer>
        );
    }
}

NavigationDrawer.PropTypes = {
    aciveNavItem: React.PropTypes.string.isRequired,
    open: React.PropTypes.string.bool,
    onSelectNavItem: React.PropTypes.func.isRequired,
}

export default  NavigationDrawer;
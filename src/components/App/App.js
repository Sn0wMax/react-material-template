import React, { Component } from 'react';
import { AppBar, Drawer, Avatar, Popover, List, ListItem } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import NavigationDrawer from './NavigationDrawer';

const style = require("../../../style/App.scss");

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            aciveNavItem: "home",
            popoverOpen: false,
            anchorEl: null
        };
    }

    componentWillMount() {
        const status = this.props.user.status;
        if (status != "authorized") {
            this.props.push(`/login?path=${this.props.pathname}`);
        }
    }

    titleForPath() {
        const pathname = this.props.pathname;
        if (pathname == "/app") {
            return "Home";
        } else if (pathname == "/app/settings") {
            return "Settings";
        } else {
            return "";
        }
    }

    onSelectNavItem(value) {
        let path = `/app/${value}`;
        if (value == "home") {
            path = "/app"
        }
        this.props.push(path);
        this.setState({
            drawerOpen: false,
            aciveNavItem: value
        });
    }

    render() {
        const user = this.props.user.data;
        const username = user == null ? "" : user.username;
        return (
            <div>
                <AppBar 
                    title={this.titleForPath()}
                    iconElementRight={
                        <div 
                            style={styles.userContainerStyle}
                            onTouchTap={(event) => {
                                event.preventDefault();
                                this.setState({
                                    popoverOpen: true,
                                    anchorEl: event.currentTarget
                                });
                            }}
                        >
                            <p style={styles.usernameTextStyle}>{username}</p>
                            <Avatar style={styles.avatarStyle}>{username[0]}</Avatar>
                            <Popover
                                open={this.state.popoverOpen}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                onRequestClose={() => {
                                    this.setState({
                                        popoverOpen: false
                                    });
                                }}
                            >
                                <List style={styles.popoverListStyle} >
                                    <ListItem 
                                        innerDivStyle={{padding: 10}} 
                                        style={styles.popoverListItemTextStyle} 
                                        primaryText="Logout" 
                                        onTouchTap={() => {
                                            this.props.push("/login?logout=true");
                                        }}
                                    />
                                </List>
                            </Popover>
                        </div>
                    }
                    onLeftIconButtonTouchTap={() => {
                        this.setState({
                            drawerOpen: !this.state.drawerOpen
                        });
                    }}
                />
                {this.props.children}
                <NavigationDrawer 
                    open={this.state.drawerOpen}
                    aciveNavItem={this.state.aciveNavItem}
                    onSelectNavItem={this.onSelectNavItem.bind(this)}
                />
            </div>
        );
    }
}

const styles = {
    userContainerStyle: {
        display: "flex",
        flexDirection: "row",
        marginRight: 12
    },
    usernameTextStyle: {
        fontFamiliy: "Roboto, sans-serif",
        color: "white",
        marginRight: 10
    },
    avatarStyle: {
        height: 46,
        width: 46
    },
    popoverListStyle: {
        margin: 0,
        padding: 0
    },
    popoverListItemTextStyle: {
        fontSize: 14,
        fontFamiliy: "Roboto, sans-serif",
        minWidth: 200
    }
}

function mapStateToProps(state, ownProps) {
    return { 
        user: state.user,
        pathname: ownProps.location.pathname 
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
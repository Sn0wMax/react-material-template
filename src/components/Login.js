import React, { Component } from 'react';
import { AppBar, Paper, LinearProgress, FlatButton, TextField } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { setLocalUser, invalidateLocalUser } from '../actions/actions_user';
import cookie from 'react-cookie'
import { USER_COOKIE } from '../helper/CookieKeys';

const style = require("../../style/Login.scss");

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginInProgress: false,
            loginError: false,
            username: "",
            password: ""
        }
    }

    componentWillMount() {
        const status = this.props.user.status;
        if (status == "authorized") {
            const logout = this.props.query.logout;
            console.log(logout);
            if (logout) {
                cookie.remove(USER_COOKIE, { path: '/' });
                this.props.invalidateLocalUser();
            } else {
                this.props.push("/app");
                return;
            }
        }
        if (status == "unauthorized") {
            const user = cookie.load(USER_COOKIE);
            if (user != null) {
                this.props.setLocalUser(user);
            }
        }
    }

    componentWillReceiveProps(newProps) {
        const status = newProps.user.status;
        if (status == "authorized") {
            let redirectPath = this.props.query.path;
            redirectPath = redirectPath == null ? "/app" : redirectPath
            this.props.push(redirectPath);
        }
    }

    onLoginPressed() {
        this.setState({
            loginInProgress: true
        });
        this.tryLogin();
    }

    tryLogin() {
        // Do login here
        const success = this.state.username == "admin" && this.state.password == "password";
        const newState = {
            loginInProgress: false,
            loginError: !success,
            password: success ? this.state.password : ""
        };
        setTimeout(() => {
            this.setState(newState);
            if (success) {
                const user = {
                    username: this.state.username,
                    image: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-1/p50x50/14900512_1784636491798187_3749615752450685810_n.png?oh=8751f2bf5dff35f18debcb6b2f06eec1&oe=5947AE98"
                };
                cookie.save(USER_COOKIE, user, {path: "/"})
                this.props.setLocalUser(user);
            }
        }, 3000);
    }

    render() {
        return (
            <div>
                <AppBar 
                    iconClassNameLeft="navIconHidden" 
                    title="React Material Template" 
                    titleStyle={styles.appBarTitleStyle} 
                    className="appBarCentered"
                />
                <LinearProgress mode="indeterminate" style={{opacity: this.state.loginInProgress ? 1 : 0}} />
                <Paper
                    style={styles.loginContainerStyle}
                    zDepth={2}
                >   
                    <div style={styles.loginContainerInputContainerStyle}>
                        <TextField
                            floatingLabelText="Username"
                            errorText={this.state.loginError ? "Wrong username / password" : null }
                            style={styles.loginInputStyle}
                            fullWidth={true}
                            onChange={(event, value) => {this.setState({username: value})}}
                            onFocus={() => {this.setState({loginError: false})}}
                            value={this.state.username}
                            disabled={this.state.loginInProgress}
                        />
                        <TextField
                            floatingLabelText="Password"
                            errorText={this.state.loginError ? "Wrong username / password" : null }
                            style={styles.loginInputStyle}
                            type="password"
                            fullWidth={true}
                            onChange={(event, value) => {this.setState({password: value})}}
                            onFocus={() => {this.setState({loginError: false})}}
                            value={this.state.password}
                            disabled={this.state.loginInProgress}
                        />
                    </div>
                    <FlatButton 
                        style={styles.loginDialogButtonStyle}
                        label="Login"
                        primary={true}
                        disabled={this.state.loginInProgress}
                        onTouchTap={this.onLoginPressed.bind(this)}
                    />
                </Paper>
            </div>
        );
    }

}

const styles = {
    appBarTitleStyle: {
        paddingRight: 40
    },
    loginContainerStyle: {
        width: "50%",
        margin: "100px auto",
        display: "flex",
        flexDirection: "column"
    },
    loginContainerInputContainerStyle: {
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 20
    },
    loginDialogButtonStyle: {
        marginRight: 6,
        marginBottom: 12,
        alignSelf: "flex-end"
    }
};

function mapStateToProps({ user }, ownProps) {
    return { 
        user,
        query: ownProps.location.query
    };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ push, setLocalUser, invalidateLocalUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
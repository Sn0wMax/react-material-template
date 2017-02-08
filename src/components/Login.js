import React, { Component } from 'react';
import { AppBar, Paper, LinearProgress, FlatButton, TextField, Checkbox } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { setLocalUser, invalidateLocalUser } from '../actions/actions_user';
import LoginHelper from '../helper/LoginHelper';

const style = require("../../style/Login.scss");

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginInProgress: false,
            loginError: false,
            username: "",
            password: "",
            rememberMe: true
        }
    }

    componentWillMount() {
        const status = this.props.user.status;
        if (status == "authorized") {
            const logout = this.props.query.logout;
            console.log(logout);
            if (logout) {
                LoginHelper.removeUserToken();
                this.props.invalidateLocalUser();
            } else {
                this.props.push("/app");
                return;
            }
        }
        if (status == "unauthorized") {
            const tokenInfo = LoginHelper.getUserToken();
            if (tokenInfo.decodeError != null) {
                LoginHelper.removeUserToken();
                return;
            }
            const user = tokenInfo.decodedData
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
                const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIn0.9nZa90Cr-pSf7sBp9XJgxqkpxfO4EIGs2dMFVn5XEzY";
                const user = {
                    username: "Admin"
                }
                LoginHelper.storeUserToken(userToken, this.state.rememberMe);
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
                        <Checkbox 
                            label="Remember Me"
                            style={styles.rememberMeCheckboxStyle} 
                            checked={this.state.rememberMe} 
                            onCheck={(event, checked) => {
                                this.setState({
                                    rememberMe: checked
                                });
                            }}
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
    },
    rememberMeCheckboxStyle: {
        marginTop: 20
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
import React, { Component } from 'react';
import { MuiThemeProvider, getMuiTheme, lightBaseTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';

// Needed for onTouchTap
injectTapEventPlugin();

const AppZIndex = {
    zIndex: {
        menu: 1000,
        drawerOverlay: 1100,
        drawer: 1200,
        appBar: 1300,
        dialogOverlay: 1400,
        dialog: 1500,
        layer: 2000,
        popover: 2100,
        snackbar: 2900,
        tooltip: 3000
    }
    
}

export default class DesignContainer extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme, AppZIndex)}>
				{this.props.children}
			</MuiThemeProvider>
		);
	}
}
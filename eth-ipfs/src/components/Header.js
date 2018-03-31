import React from 'react'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import Button from 'material-ui/Button';

import { Link } from 'react-router-dom'


export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rootLink = props => <Link to="/" {...props} />

        return(
            <AppBar position="static" color="default">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        color="inherit"
                        component={rootLink}
                    >
                        PhotoSharing
                    </Button>

                    <div>
                        <Button>
                            Sign In
                        </Button>
                        <Button>
                            Sign Up
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}
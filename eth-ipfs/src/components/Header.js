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
        const uploadLink = props => <Link to="/upload" {...props} />
        const gallery = props => <Link to="/gallery" {...props} />


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
                        <Button
                            color="inherit"
                            component={uploadLink}
                        >
                            Upload
                        </Button>
                        <Button
                            color="inherit"
                            component={gallery}
                        >
                            Gallery
                        </Button>

                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}
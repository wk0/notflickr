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
                        style={{fontFamily: 'Oswald', fontSize: '24px'}}
                    >
                        Not Flickr
                    </Button>
                    <div>
                        <Button
                            variant="raised" 
                            color="primary"
                            component={uploadLink}
                            style={{fontFamily: 'Oswald', marginRight: '10px', fontSize: '14px'}}
                        >
                            Upload
                        </Button>
                        <Button
                            variant="raised" 
                            color="secondary"
                            component={gallery}
                            style={{fontFamily: 'Oswald', fontSize: '14px'}}
                        >
                            Gallery
                        </Button>

                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}
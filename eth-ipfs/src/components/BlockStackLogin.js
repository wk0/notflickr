import React from "react";
import Button from "material-ui/Button"
import Paper from 'material-ui/Paper';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


const blockstack = require('blockstack');

class BlockStackLogin extends React.Component{

    constructor(props){
        super(props);
        console.log(this.props.history);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        event.preventDefault()
        var BLOCKSTACK_HOST = 'https://browser.blockstack.org/auth'
        var DEFAULT_SCOPE = ['store_write']
        var redirectURI = `${window.location.origin}/`
        var manifestURI = `${window.location.origin}/manifest.json`
        var scopes = DEFAULT_SCOPE
        var authRequest = blockstack.makeAuthRequest(blockstack.generateAndStoreTransitKey(), redirectURI, manifestURI, scopes)
        blockstack.redirectToSignInWithAuthRequest(authRequest, BLOCKSTACK_HOST)

    }

    render(){
        if (this.props.location.search){
            return <Redirect to="/gallery"/>
        }

        return (
            <div>            
                <h1 style={{textAlign:'center'}}>Decentralized Flickr</h1>
                <br/>
                <Button style={{marginLeft: '325px'}} variant="raised" color="primary" onClick={this.handleClick}>Login</Button>
            </div>
        );
    }
}

// <div style = {{marginLeft: 700, marginTop: 200, marginBottom: 20}}>
//             </div>
//            <div style = {{marginLeft:120}}><Button onClick={this.handleClick}>Login</Button></div>


export default BlockStackLogin;
import React from "react";
import Button from "material-ui/Button"
const blockstack = require('blockstack');

class BlockStackLogin extends React.Component{

    constructor(props){
        super(props);
        
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
        return (
            <div><Button onClick={this.handleClick}>Login</Button></div>
        );
    }
}

export default BlockStackLogin;
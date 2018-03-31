import React from "react";
const blockstack = require('blockstack');


class Gallery extends React.Component{

    constructor(props){
        super(props);

        let userData  = blockstack.loadUserData();

        console.log(userData);
    }

    render(){
        return(

            <div></div>
        );
    }

}

export default Gallery;
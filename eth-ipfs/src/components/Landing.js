import React from "react";
import * as blockstack from 'blockstack'
import Button from "material-ui/Button"
class Landing extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userimages : []
        }

    }


    componentDidMount(){
        blockstack.getFile('images.json', true).then((userimages)=>{
            var images = JSON.parse(userimages || '[]')
            this.setState({
                userimages : images
            })
        })

    }

    handlePutFile(){
        blockstack.putFile('test.json', JSON.stringify({test: "test"}), true);
    
    }

    handleGetFile(){
        blockstack.getFile('test.json', true)
        .then((test) => {
          var testfile = JSON.parse(test || '[]')
          console.log(testfile);
        });
    }

    render(){
        return(
            <div>

            <div>Landing</div>
            <Button onClick={this.handlePutFile}>Add</Button>
            <Button onClick={this.handleGetFile}>Get</Button>
            </div>
        );
    }

}

export default Landing;
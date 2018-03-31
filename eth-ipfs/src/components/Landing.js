import React from "react";
import * as blockstack from 'blockstack'
import Button from "material-ui/Button"
import List, {ListItem} from "material-ui/List";
import Detail from "./Detail";
class Landing extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userimages : []
        }

    }


    componentDidMount(){
        blockstack.getFile('images3.json', false).then((userimages)=>{
            var images = JSON.parse(userimages || '[]')
            console.log(images);
            this.setState({
                userimages : images
            })
        })
        
    }

    handlePutFile(){
        blockstack.putFile('test.json', JSON.stringify({test: "test"}), true);
    
    }

    handleGetFile(){
        blockstack.getFile('images3.json', false)
        .then((test) => {
          var testfile = JSON.parse(test || '[]')
          console.log(testfile);
        });
    }

    render(){
        return(
            <div>
            <List>
            {this.state.userimages.map((item, index)=>{
                return (
                <div>
                <ListItem key={index}>
                <Detail 
                    imgHash={item}
                />
                </ListItem>
                </div>
                );
            })} 
            </List>   
            </div>
        );
    }

}

export default Landing;
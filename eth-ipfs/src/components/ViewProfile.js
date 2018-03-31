import React from "react";
import * as blockstack from 'blockstack'
import List, {ListItem} from "material-ui/List";
import Detail from "./Detail";



class ViewProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id : this.props.match.params.blockstackid || "",
            userimages: [],
            decrypt : this.props.match.params.decrypt || false
        }
    }

    componentWillMount(){
        const option ={
            decrypt : this.state.decrypt,
            username : this.state.id
        }
        blockstack.getFile('images.json', option).then((userimages)=>{
            var images = JSON.parse(userimages || '[]')
            this.setState({
                userimages : images
            })
        })
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

export default ViewProfile;
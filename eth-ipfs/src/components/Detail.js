import React from "react";
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = {
    card: {
      maxWidth: 500,
    },
    media: {
      height: 200,
    },
};

class Detail extends React.Component{

    constructor(props){
        super(props);
        console.log(this.props)

        //const {id} = this.props.match.params;
        const id = this.props.imgHash ?  this.props.imgHash : this.props.location.state.imgHash
    } 

    render(){
        const { classes } = this.props;
        //const {id} = this.props.match.params;
        const id =  this.props.imgHash

        const imgSrc="https://ipfs.io/ipfs/"+id;
        return(
            <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={imgSrc}
                    title="Contemplative Reptile"
                /> 
                <CardContent>
                <h2>
                    IPFS Image
                </h2>
                <p>
                    {id}
                </p>
                </CardContent>
                <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
                </CardActions>
            </Card>
            </div>
        );
    }

}

export default withStyles(styles)(Detail);
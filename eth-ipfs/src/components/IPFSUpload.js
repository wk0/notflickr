import {Table, Grid, Form } from 'react-bootstrap';
import Button from "material-ui/Button"
import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import web3 from '../web3';
import ipfs from '../ipfs';
import storehash from '../storehash';
import { Redirect } from 'react-router-dom'
import Checkbox from 'material-ui/Checkbox';

const blockstack = require('blockstack');


class IPFSUpload extends Component {
 
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: '', 
      checkedA: true
    };
   
    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    onClick = async () => {

    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        // get Transaction Receipt in console on click
        // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick

    onSubmit = async (event) => {
      event.preventDefault();

      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();
     
      console.log('Sending from Metamask account: ' + accounts[0]);

      //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash:ipfsHash[0].hash });

        blockstack.getFile('images3.json', false).then((userimages)=>{
          var images = JSON.parse(userimages || '[]');
          images.push(ipfsHash[0].hash);
          blockstack.putFile('images3.json', JSON.stringify(images), false);
      });


        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
        //return the transaction hash from the ethereum contract
        //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
        
        storehash.methods.sendHash(this.state.ipfsHash).send({
          from: accounts[0] 
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); //storehash 
      }) //await ipfs.add 
    }; //onSubmit 
  

    handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    render() {
      if (this.state.ipfsHash){

        this.props.history.push({
          pathname: '/gallery',
          state: {imgHash: this.state.ipfsHash}
        });
 
      }

      return (
        <div className="UploadForm">
        <Grid>
          <h3 style={{fontFamily: 'Oswald', fontSize: '24px'}}> Choose file to send to IPFS </h3>
          <br/>
          <Form onSubmit={this.onSubmit}>
            
            <div style={{marginLeft: '85px'}}>
              <input 
                type = "file"
                onChange = {this.captureFile}
              />
            </div>

            <br/>
            <br/>

             <div style={{display:'flex', direction:'row', alignItems: 'center', justifyContent: 'center'}}>
                <Button
                variant="raised" 
                color="primary"
                style={{fontFamily: 'Oswald', marginRight: '10px', fontSize: '14px'}}
                type="submit"
                >
                  Send it 
                </Button>

            
              <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
              />
              <p style={{fontFamily: 'Oswald'}}>Encrypt</p>
            </div>
          </Form>

          <hr/>
            <Button
              variant="raised" 
              color="secondary"
              style={{fontFamily: 'Oswald', marginRight: '10px', fontSize: '14px'}}
              onClick = {this.onClick}> Get Transaction Receipt </Button>

              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr>
                    <td>IPFS Hash # stored on Eth Contract</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>

                  <tr>
                    <td>Tx Hash # </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>

                  <tr>
                    <td>Block Number # </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>

                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>                
                </tbody>
            </Table>
        </Grid>
     </div>
      );
    } //render
}

export default IPFSUpload;

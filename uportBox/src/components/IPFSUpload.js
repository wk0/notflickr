import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import {web3, storehash} from '../util/connectors';
import ipfs from '../util/ipfs';

class IPFSUpload extends Component {
 
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: ''   
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
      const accounts = web3.eth.getAccounts();
     
      console.log(accounts)
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
  
    render() {
      
      return (
        <div className="UploadForm">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h3> Choose file to send to IPFS </h3>
          <form onSubmit={this.onSubmit}>
            <input 
              type = "file"
              onChange = {this.captureFile}
            />

            <Button variant="raised" color="primary" type="submit">
                Send it 
             </Button>
          </form>

          <hr/>
            <Button onClick = {this.onClick}> Get Transaction Receipt </Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tx Receipt Category</TableCell>
                        <TableCell>Values</TableCell>
                    </TableRow>
                </TableHead>
               
                <TableBody>

                  <TableRow key={1}>
                    <TableCell>IPFS Hash # stored on Eth Contract</TableCell>
                    <TableCell>{this.state.ipfsHash}</TableCell>
                  </TableRow>

                  <TableRow key={2}>
                    <TableCell>Ethereum Contract Address</TableCell>
                    <TableCell>{this.state.ethAddress}</TableCell>
                  </TableRow>

                  <TableRow key={3}>
                    <TableCell>Tx Hash # </TableCell>
                    <TableCell>{this.state.transactionHash}</TableCell>
                  </TableRow>

                  <TableRow key={4}>
                    <TableCell>Block Number # </TableCell>
                    <TableCell>{this.state.blockNumber}</TableCell>
                  </TableRow>

                  <TableRow key={5}>
                    <TableCell>Gas Used</TableCell>
                    <TableCell>{this.state.gasUsed}</TableCell>
                  </TableRow>
          
                </TableBody>
            </Table>
     </div>
      );
    } //render
}

export default IPFSUpload;

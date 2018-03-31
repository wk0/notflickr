import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import IPFSUpload from './components/IPFSUpload'

class App extends Component {
    render() {
      return (
        <IPFSUpload/>
      );
    } //render
}

export default App;

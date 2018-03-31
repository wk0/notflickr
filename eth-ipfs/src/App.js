import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import IPFSUpload from './components/IPFSUpload'
import Landing from './components/Landing'
import BlockStackLogin from './components/BlockStackLogin';




class App extends Component {
    render() {
      return (

        <Router>
          <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={IPFSUpload}/>
            <Route path="login" component={BlockStackLogin}/>
          </Switch>
          </div>
        </Router> 
      )
    } 
}

export default App;



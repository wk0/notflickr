import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import IPFSUpload from './components/IPFSUpload'
import Landing from './components/Landing'
import BlockStackLogin from './components/BlockStackLogin';
import Gallery from './components/Gallery'
import Detail from './components/Detail'

class App extends Component {
    render() {
      return (

        <Router>
          <div>
          <Header/>
          <Switch>
            <Route exact path="/upload" component={IPFSUpload}/>
            <Route path="/login" component={BlockStackLogin}/>
            <Route path="/gallery" component={Gallery}/>
            <Route path="/detail/:id" component={Detail}/>
            <Route path="/" component={Landing}/>

          </Switch>
          </div>
        </Router> 
      )
    } 
}

export default App;



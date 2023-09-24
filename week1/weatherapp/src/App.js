import { Component } from "react";
import {BrowserRouter, Route} from 'react-router-dom'

import Home from "./components/Home";

import './App.css';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Route exact path='/' component={Home} />
      </BrowserRouter>
    )
  }
}

export default App;

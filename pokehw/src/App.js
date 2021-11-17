import React, { Component } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Poke from './views/Poke';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  constructor(){
    super();
    this.state ={
        pokemon: '',
        user: ''
    }
}

setUser = (user)=>{
  this.setState({user}, ()=> console.log("User is", this.state.user))
}
  render() {
    return (
      <div>
          <NavBar/>
        <Routes>
          <Route  path ='/' element={<Home />}/>
          <Route  path ='/Poke' element={<Poke setUser = {this.setUser} poke ={this.state.pokemon} />}/>
        </Routes>
      </div>
    )
  }
  }


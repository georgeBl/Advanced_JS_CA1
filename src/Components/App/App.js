import React, {Component} from 'react'
import CurrentWeather from '../CurrentWeather/CurrentWeather.js'
import FutureWeather from '../FutureWeather/FutureWeather.js'
import NavBar from '../NavBar/NavBar.js'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

//styles
import './App.css'

class App extends Component{
  render(){
    return(
      <div>
        <BrowserRouter>
          <div className="wrapper">
            <div className="main">
              <div className="container">
                <NavBar />
                <Route exact path="/" component={Home}/>
                <Route path="/currentWeather" component={Current}/>
                <Route path="/futureWeather" component={Future}/>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


class Home extends Component{
  constructor(props){
    super(props)
    this.state = {redirect:false,showComponent:true};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(event){
    this.setState({cityInput:event.target.value});
  }
  handleOnClick(event) {
    event.preventDefault();
    this.setState({redirect:true})
  }
  render(){
    if(this.state.redirect){
      return <Redirect to={{
              pathname: '/currentWeather',
              state: { cityInput: this.state.cityInput  }

          }}/>
      }
    return(

    <div className="row justify-content-center">
      <div className="col-6">
        <p className="home-text text-center">Find the weather in your City!</p>
        <form className="">
          <input id="cityinput" type="text" placeholder="City..." autoComplete="off" onChange={this.handleOnChange}/>
          <input type="submit" value="Search" onClick={this.handleOnClick} />
        </form>
      </div>
    </div> // will have a search as well
  )}

}
const Current = () => <CurrentWeather />
const Future = () => <FutureWeather />


export default App;

// style={{ textDecoration: 'none', color: 'black' }}

import React, {Component} from 'react'
import CurrentWeather from './CurrentWeather.js'
import FutureWeather from './FutureWeather.js'

import {BrowserRouter, Link, Route} from 'react-router-dom'

//styles
import './styles/App.css'

class App extends Component{
  render(){
    return(
      <div>
        <BrowserRouter>
          <div className="wrapper">
            <div className="main">
              <div className="container">
                <div className="row nav-container">
                    <div className="col  nav-container">
                      <Link  className="nav-link"  to="/currentWeather">Current</Link >
                    </div>
                    <div className="col  nav-container">
                      <Link  className="nav-link" to="/futureWeather">Future Weather</Link>
                    </div>
                </div>
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

const Home = () =>
                <div>
                  <h1> We find the weather for you! Right now or for the next few days! Check it out! </h1>
                <form className="">
                  <input id="cityinput"type="text" placeholder="City..." autoComplete="off" value="" onChange=""/>
                  <input type="submit" value="Search" onClick=""/>
                </form>

                </div>;
const Current = () => <CurrentWeather />
const Future = () => <FutureWeather />


export default App;

// style={{ textDecoration: 'none', color: 'black' }}

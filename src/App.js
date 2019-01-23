import React, {Component} from 'react'
import CurrentWeather from './CurrentWeather.js'
// import HistoricalWeather from './HistoricalWeather'

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
                <div className="row">
                    <div className="col  nav-container">
                      <Link className="nav-links" className="nav-link"  to="/currentWeather">Current</Link >
                    </div>
                    <div className="col  nav-container">
                      <Link className="nav-links" className="nav-link" to="/historicalWeather">Historical Weather</Link>
                    </div>
                </div>
                <Route exact path="/" component={Home}/>
                <Route path="/currentWeather" component={Current}/>
                <Route path="/historicalWeather" component={HistoricalWeather}/>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const Home = () => <div>Home</div>;
const Current = () => <CurrentWeather />
const HistoricalWeather = () => <div>Historical Weather</div>


export default App;

// style={{ textDecoration: 'none', color: 'black' }}

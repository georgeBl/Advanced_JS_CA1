import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state ={currentWeatherClicked:"", futureWeatherClicked:""};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){
    //on refresh this resets and brakes this logic
    //to be fixed
    if(event.target.name === "currentWeather"){
      this.setState({currentWeatherClicked:"link-clicked", futureWeatherClicked:""});
    }else if(event.target.name === "futureWeather"){
      this.setState({currentWeatherClicked:"", futureWeatherClicked:"link-clicked"})
    } else{
      this.setState({currentWeatherClicked:"", futureWeatherClicked:""});
    }
  }

  render(){
    return(
      <div className="row nav-container">
        <div className="col  nav-container">
          <Link  className={`nav-link + ${this.state.currentWeatherClicked}`}  to="/currentWeather" onClick={this.handleClick} name="currentWeather" >Current</Link >
        </div>
        <div className="col  nav-container">
          <Link  className={`nav-link + ${this.state.futureWeatherClicked}`} to="/futureWeather" name="futureWeather" onClick={this.handleClick}>Future Weather</Link>
        </div>
      </div>
    )
  }
}

export default NavBar

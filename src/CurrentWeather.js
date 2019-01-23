//importing components
import React from 'react';
import "bulma/css/bulma.css";
import axios from 'axios';
import WeatherResult from './WeatherResult';


import './styles/App.css'

const apiKey = '266eaf36b387e650580d9c458d816e24';

class CurrentWeather extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      weather: undefined,
      cityInput: "",
      searchClicked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAutoComplete = this.handleAutoComplete.bind(this);
  }
//
 handleChange(event){
   this.setState({cityInput : event.target.value});
 }

 handleSubmit(event){
   console.log(event.target.value);
   // let url = ;
   // console.log(url);
   axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInput}&APPID=${apiKey}`)
   .then(response=>{
     console.log(response.data);
     this.setState({weather: response.data});
   })
   .catch(error=>{console.log(error);});
    // this.setState({searchClicked: true}); //needs check
    this.state.searchClicked = true;
   event.preventDefault();
 }

 handleAutoComplete(event){
   event.preventDefault();
 }

 render(){

   return(
     <div className="row">
       <div className="col-xs-5 title-container">
        image goes there
       </div>
       <div className="col-xs-7 form-container">
         <form className="">
           <input id="cityinput"type="text" placeholder="City..." autoComplete="off" value ={this.state.cityInput} onChange={this.handleChange} />
           <input type="submit" value="Search" onClick={this.handleSubmit} />
         </form>
         {this.state.searchClicked ? <WeatherResult
           location={this.state.weather.name}
           humidity={this.state.weather.main.humidity}
           country={this.state.weather.sys.country}
           temperature={this.state.weather.main.temp}
           max_temp={this.state.weather.main.temp_max}
           min_temp={this.state.weather.main.temp_min}
           weather_type={this.state.weather.weather[0].main}
           windspeed={this.state.weather.wind.speed}
           /> : null }
       </div>
     </div>
   );
 }
}

export default CurrentWeather;

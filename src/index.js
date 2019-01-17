//importing components
import React from 'react';
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import axios from 'axios';

const apiKey = '266eaf36b387e650580d9c458d816e24';
const kelvin = 273.15;
class WeatherPannel extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      weather: [],
      cityInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//
 handleChange(event){
   console.log(event.target.value);
   this.setState({cityInput : event.target.value});
   // let url = ;
   // console.log(url);
   axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&APPID=${apiKey}`)
   .then(response=>{
     console.log(response.data);
     this.setState({weather: response.data});
   })
   .catch(error=>{console.log(error);});
 }

 handleSubmit(event){
   // console.log(event.target.value);
   // // let url = ;
   // // console.log(url);
   // axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInput}&APPID=${apiKey}`)
   // .then(response=>{
   //   console.log(response.data);
   //   this.setState({weather: response.data});
   // })
   // .catch(error=>{console.log(error);});
   // event.preventDefault();
 }

 render(){
   return(
     <div>
       <label htmlFor="City input">Input a city:</label>
       <input id="cityinput" value ={this.state.cityInput} onChange={this.handleChange} />
       <input type="submit" value="Search" onClick={this.handleSubmit}/>
     </div>
   );
 }
}

ReactDOM.render(<WeatherPannel />, document.getElementById('root'));

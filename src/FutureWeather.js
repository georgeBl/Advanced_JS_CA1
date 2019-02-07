//importing components
import React, {Component} from 'react';
import axios from 'axios';
import WeatherResult from './WeatherResult';
import './styles/App.css';
import Graph from './Graph.js';
import cityList from './constants/city.list.json';


const apiKey = '266eaf36b387e650580d9c458d816e24';

class FutureWeather extends Component{
  constructor(props){
    super(props);

    this.state={ cityInput:'', searchClicked:false, weather:[], showErrorLabel:false, inputMessage: "", labelClass: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({cityInput: event.target.value});
    //find the city in the array
    let elementPos = cityList.map(function(x) {return x.name.toLowerCase(); }).indexOf(event.target.value.toLowerCase());
    let objectFound = cityList[elementPos];
    if(objectFound){
      this.setState({showErrorLabel:true, inputMessage:"This city is in our database", labelClass:"text-success"});
    }else{
      this.setState({showErrorLabel:true, inputMessage:"This city is not in our database",  labelClass:"text-danger"});
    }
    if(event.target.value === ""){
        this.setState({showErrorLabel:false});
    }
  }

  handleSubmit(event){

    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityInput}&APPID=${apiKey}`)
    .then(response=>{
      if(this.state.labelClass === "text-success") this.setState({weather:response.data, searchClicked:true, showErrorLabel:false });
    });
    event.preventDefault();
  }

  render(){
    return(
      <div className="row">
        <div className="col form-container">
          <form className="form-horizontal" role="form">
              <input id="cityinput" type="text" placeholder="City..." autoComplete="off" value ={this.state.cityInput} onChange={this.handleChange} />
              <input type="submit" value="Search" onClick={this.handleSubmit} />
              {this.state.showErrorLabel ? <small id="emailHelp" className={`form-text ${this.state.labelClass}`}>{this.state.inputMessage}</small> : null }
          </form>
          {this.state.searchClicked ? <Graph weather={this.state.weather.list}/> : null}
        </div>
      </div>
  )};
}


export default FutureWeather

//importing components
import React,{Component} from 'react';
import axios from 'axios';
import WeatherResult from './WeatherResult';
import cityList from '../../constants/city.list.json';
// import './styles/App.css'
import default_image from '../../default_img.jpg';


const apiKey = '266eaf36b387e650580d9c458d816e24';
class CurrentWeather extends Component{
  constructor(props){
    super(props);
    this.state = {
      weather: undefined,
      searchClicked: false,
      cityInput:"",
      backgroundImage: default_image,
      visible: false,
      showErrorLabel:false,
      inputMessage:"",
      labelClass:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//
 handleChange(event){
   this.setState({cityInput : event.target.value});
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

 componentDidMount(){
 }
 handleSubmit(event){
  if(this.state.labelClass === "text-success") {
   axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInput}&APPID=${apiKey}`)
   .then(response=>{
     this.setState({
       weather: response.data,
       searchClicked:true,
       showErrorLabel:false
      });
     this.setState({  backgroundImage: "https://source.unsplash.com/1600x900/?" + this.state.weather.weather[0].main});
   })
   .catch(error=>{console.log(error);});
 }
   event.preventDefault();
 }

 render(){
   return(
     <div className="row">
       <div className="col-xs-5 title-container" style={{backgroundImage: `url(${this.state.backgroundImage})`}}>
       </div>
       <div className="col-xs-7 form-container">
         <form className="">
           <input id="cityinput"type="text" placeholder="City..." autoComplete="off" onChange={this.handleChange} />
           <input type="submit" value="Search" onClick={this.handleSubmit} />
           {this.state.showErrorLabel ? <small id="emailHelp" className={`form-text ${this.state.labelClass}`}>{this.state.inputMessage}</small> : null }
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



//
// //Autocomplete
// <AutoComplete
//  menuStyle={{}}
//  inputProps = {{
//    style: {
//      backgroundColor : 'transparent',
//      border: '0',
//      borderBottom: 'solid 1px #f16051',
//      width: '95%',
//      paddingBottom: '4px',
//      color: 'white',
//      fontWeight: 'lighter',
//      letterSpacing: '2px',
//      marginBottom: '30px',
//      marginRight: '20px',
//      fontSize: '20px',
//      outline: 'none'
//    },
//    placeholder: 'City...'
//  }}
//  items={countryList}
//  shouldItemRender={(item, value) => item.country.country_name.toLowerCase().indexOf(value.toLowerCase()) > -1}
//  getItemValue={item => item.country.country_name}
//  renderItem={(item.slice?, highlighted) =>
//    <div
//      key={item.country.country_id}
//      style={{
//        backgroundColor: highlighted ? 'black' : 'transparent',
//        color: 'white',
//        fontSize: '20px',
//        fontWeight: 'lighter',
//        cursor: 'default',
//        width: '300px'
//    }}
//    >
//      {item.country.country_name}
//    </div>
//  }
//  value={this.state.cityInput}
//  onChange={this.handleChange}
//  onSelect={(value, item) => {
//  // set the menu to only the selected item
//  this.setState({  cityInput: value })
//  // or you could reset it to a default list again
//  // this.setState({ unitedStates: getStates() })
//  }}
//  />

//
// const playlistData = this.state.playlistData.map(pr =>{
//   const playListName = pr.playlistName.toLowerCase.indexOf(this.insertedValue) > -1
//   if(playListName){
//     <Component />
//   }
// })

//importing components
import React, {Component} from 'react';
// import './styles/App.css'
import Chart from 'chart.js';
import moment from 'moment'
// import $ from "jquery";
//constants
const KELVIN = 273.15;


const sliderValues = [3,6,9,12,15,18,21];

class Graph extends Component{
  constructor(props){
    super(props);
    this.state = {barType:'line', tempChart:"", sliderValue:3, weatherList: this.props.weather.list}
    this.handleChange = this.handleChange.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
  }

  handleSlider(event){
    let weatherResults = this.props.weather.list.filter((w,i)=>{ if(i%event.target.value===0 || i===0) return w});
    this.state.tempChart.destroy();
    this.buildChart(weatherResults);
    console.log(weatherResults);
    this.setState({sliderValue:event.target.value})

  }

  handleChange(event){
    this.state.tempChart.destroy();
    this.setState({barType:event.target.value})
    this.buildChart(this.props.weather.list);
  }
  buildChart(weatherList`){
    const raw_data  = weatherList.map(w =>{
      // const weatherDate =  + new Date(w.dt*1000).getDate() ;
      const weatherDate = moment(new Date(w.dt*1000)).format("MMM DD HH:mm")
      const weatherTemp = (w.main.temp - KELVIN).toFixed(1);
      return {date: weatherDate , temp: weatherTemp}

    });
    let labels = [];
    for(let i = 0; i<raw_data.length;i++){
      labels.push(raw_data[i]["date"]);
    }

    let dataset = [];
    for(let i = 0; i<raw_data.length;i++){
      dataset.push(raw_data[i]["temp"]);
    }
    let ctx = document.getElementById("dateChart");
    let config = {
        type: this.state.barType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature in °C every 3 hours',
                data: dataset,
                backgroundColor:'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:false
                    }
                }]
            },
            maintainAspectRatio: false
        }
    }
    this.setState({tempChart: new Chart(ctx, config)});
    // tempChart.destroy();
  }

  componentDidUpdate(prevProps){
    if(prevProps.weather.city.id !== this.props.weather.city.id){
      this.state.tempChart.destroy(); //fixes funny bug when the old graph appears when the mouse is over the graph
      this.buildChart(this.props.weather.list);
    }
  }
   componentDidMount(){
     this.buildChart(this.props.weather.list);
  }

  render(){
    return(
      <div className="chart-container" id="chartDiv">
        <canvas id="dateChart"></canvas>
        <div className="row">
          <div className="col">
          <select name="graphs" onChange={this.handleChange}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
          <input type="range" min='3'  max="24" step="3" value={this.state.sliderValue} className="range-slider" id="tempHoursRange"onChange={this.handleSlider} />
          </div>
        </div>


      </div>
    );
  }
}

export default Graph;

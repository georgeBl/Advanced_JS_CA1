//importing components
import React, {Component} from 'react';
import './styles/App.css'
import Chart from 'chart.js';
import moment from 'moment'
import $ from "jquery";
//constants
const KELVIN = 273.15;




class Graph extends Component{
  constructor(props){
    super(props);
    this.state = {barType:'line'}
  }

  buildChart(){
    const raw_data  = this.props.weather.list.map(w =>{
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
    let tempChart = new Chart(ctx, config);
    tempChart.destroy();
  }

  componentDidUpdate(prevProps){
    if(prevProps.weather.city.id !== this.props.weather.city.id){
      this.buildChart();
    }
  }
   componentDidMount(){
     this.buildChart();
  }

  render(){
    return(
      <div className="chart-container" id="chartDiv">
      <canvas id="dateChart"></canvas>
      </div>
    );
  }
}

export default Graph;

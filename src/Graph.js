//importing components
import React, {Component} from 'react';
import './styles/App.css'
import Chart from 'chart.js';
import moment from 'moment'
//constants
const KELVIN = 273.15;




class Graph extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log(this.props);
    const raw_data  = this.props.weather.map(w =>{
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
    var ctx = document.getElementById("dateChart");
    var myChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature in °C every 3 hours',
                data: dataset,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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
    });
  }

  render(){
    return(
      <div className="chart-container">
      <canvas id="dateChart" width="400" height="400"></canvas>
      </div>
    );
  }
}

export default Graph;

import React from 'react';

const KELVIN = 273.15;



const WeatherResult = props => (
	<div className="weather__info">
	 {
	 	props.location && props.country && <p className="weather__key"> Location:
	 		<span className="weather__value"> { props.location }, { props.country }</span>
	 	</p>
	 }
	 {
	 	props.temperature && <p className="weather__key"> Temperature:
	 		<span className="weather__value"> { (props.temperature - KELVIN).toFixed(1) } &#176;C	</span>
	 	</p>
	 }
	 {
	 	props.humidity && <p className="weather__key"> Humidity:
	 		<span className="weather__value"> { props.humidity }% </span>
	 	</p>
	 }
	 {
	 	props.weather_type && <p className="weather__key"> Conditions:
	 		<span className="weather__value"> { props.weather_type } </span>
	 </p>
	 }
   {
	 	props.windspeed && <p className="weather__key"> Wind Speed:
	 		<span className="weather__value"> { props.windspeed } m/s </span>
	 	</p>
	 }
	 {
	 	props.error && <p className="weather__error">{ props.error }</p>
	 }
	</div>
);

export default WeatherResult;

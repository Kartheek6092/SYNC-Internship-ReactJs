import { Component } from "react"

import {TbVirusSearch} from 'react-icons/tb'

import './index.css'

class Home extends Component {
    state = { weatherdetails: '', city: '', country: '', showError: false}

    //  updating the city name
    updateCity = event =>{
        this.setState({city :event.target.value})
    }

    //  updating the country name
    updateCountry = event =>{
        this.setState({country :event.target.value})
    }

    //  API for getting the weather details by the city and country name and set the details in the state
    getLocationWeather = async () =>{
        const {city, country} = this.state
        const apiKey = 'a5d177111c4ab1beba8b639966ec299b'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`

        const response = await fetch(url)

        const data = await response.json()
        if(response.ok === true){
            this.setState({weatherdetails: data})
        }else{
            this.setState({showError: true})
        }

    }

    render(){
        const {city, weatherdetails, showError} = this.state

        //  converting main details from the data recieved
        const weather = weatherdetails !== undefined ? {
            temp: weatherdetails!=='' ? Math.round(weatherdetails.main.temp - 273.15) : null,
            feelsLike: weatherdetails!=='' ? Math.round(weatherdetails.main.feels_like - 273.15) : null,
            humidity: weatherdetails!=='' ? weatherdetails.main.humidity : null,
            pressure: weatherdetails!=='' ? weatherdetails.main.pressure : null,
            speed: weatherdetails!=='' ? weatherdetails.wind.speed : null
        } : null

        return(
            <div className="homeContainer">
                <form className="weather-container">
                    <h1 className="form-heading">How's your weather today?</h1><br />
                    <div className="search-container">
                        <input type="search" onChange={this.updateCity} className="city-input" placeholder="Enter CITY name" />
                        <input type="search" onChange={this.updateCountry} className="country-input" placeholder="Enter COUNTRY name" />
                        <TbVirusSearch className="search-icon" onClick={this.getLocationWeather} />
                    </div>

                    {weatherdetails !== '' ? (<><p className="how-is-weather">Today's weather at <span className="city-name">{city.toUpperCase()}</span></p>
                    <p className="condition-status">is <span className="condition">{weather.temp > 32 ? 'Very HOT' 
                    : (25 < weather.temp && weather.temp < 32 ? 'Hot' : (20 < weather.temp && weather.temp < 26 ? 'Cool' : 'VERY COOL'))}</span></p>
                    <p className='other-details'><span>Temperature:</span> <p>{weather.temp} <sup>o</sup>C</p></p>
                    <p className='other-details'><span>Feels Like:</span> <p>{weather.feelsLike} <sup>o</sup>C</p></p>
                    <p className='other-details'><span>Humidity:</span> <p>{weather.humidity} g.m<sup>-3</sup></p></p>
                    <p className='other-details'><span>Wind Speed:</span> <p>{weather.speed} mph</p></p>
                    </>) : (showError ? <p className="error-msg">*Enter Valid City and Country names</p> : null)}
                </form>
            </div>        
        )
    }
}

export default Home
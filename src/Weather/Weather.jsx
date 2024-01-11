import { useState, useEffect } from 'react'
import './Weather.css';

export default function Weather() {
    // will contain an object with all needed data
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        fetch(`http://api.airvisual.com/v2/nearest_city?key=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setWeatherData({
                city : data.data.city,
                country : data.data.country,
                iconId : data.data.current.weather.ic,
                temperature : data.data.current.weather.tp
            }))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <div className='App_Weather'>
            {/* if weatherData !== null */}
            {weatherData && (
                <>
                    {/*Affiche et formate la date en fr ex : 11/01/2024*/}
                    <p className='time'>{new Date().toLocaleDateString("fr")}</p>
                    <div className="Weather">
                        <h1>{weatherData.city}</h1>
                        <h3>{weatherData.country}</h3>
                        <p>{weatherData.temperature}<span>°</span></p>
                        <img src={`/icons/${weatherData.iconId}.svg`} alt='image'></img>
                    </div> 
                </>
            )}
            
        </div>
        
    )
}
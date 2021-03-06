import React, {useState, useEffect} from 'react';

import WeatherCard from './WeatherCard/component';

const WeatherEngine = ({location}) => {

    // init for our state variables
    const [query, setQuery] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(
      {
        temp: null,
        city: null,
        condition: null,
        country: null
      }
    );
  
    // defining the data fetching function
    const getWeather = async (query) => 
    {
        setQuery("");
        setLoading(true);
        try 
        {
            const apiRes = await fetch (
                `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=52392332cfb0ced03c5c62e80a8bed23`
          );
      
            const resJSON = await apiRes.json();
        
            setWeather({
                temp: resJSON.main.temp,
                city: resJSON.name,
                condition: resJSON.weather[0].main,
                country: resJSON.sys.country
            });

        } catch (error) 
        {
            setError(true);
        }

        setLoading(false);
    };
  
    // Function to handle search queries from the user side
    const handleSearch = e =>
    {
      e.preventDefault();
      getWeather(query);
    };
  
    // This hook will make the code run only once the component 
    // is mounted and will only run when Location changes which won't happen
    useEffect(() => {
      getWeather(location);
    }, [location]);
  
    return (  
        <div>
       {
           // loading false: display WeatherCard
           !loading && !error ? 
           (<div> 
                <WeatherCard 
                temp = {weather.temp} 
                condition = {weather.condition} 
                city = {weather.city} 
                country = {weather.country}/>

                <form >
        
                    <input value = {query} onChange = {e => setQuery(e.target.value)}/>
                    <button onClick = {e => handleSearch(e)}> Search </button>
        
                </form>
           </div>) 
           : loading ?
           (<div style = {{ color: "black"}}> Loading </div>)
           : !loading && error? (
            <div style = {{ color: "black"}}> 
               There has been an error <br/>
               <button onClick = { () => setError(false)}> Reset! </button>
            </div>)
            : null

       }
      </div>
    );
}
 
export default WeatherEngine;
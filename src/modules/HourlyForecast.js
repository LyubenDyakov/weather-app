// This component returns each hourly forecast component,
// which includes the time, temperature, wind power & wind direction.
const HourlyComponent = (props) => {

    // Collect the arguments and store them into appropriate variables for further uses.
    const {time, icon, temp_c, wind_kph, wind_dir} = props;

    // Render the component.
    return (
        <div className="hourly-forecast">
            <ul>
                <li>{time}</li>
                <li><img src={icon} alt="hourly-icon"></img></li>
                <li style={{fontSize:20}}>{Math.round(temp_c)} °C</li>  {/*adding some styling to the text*/}
                <li style={{fontSize:12, paddingTop:5}}>{Math.round(wind_kph)} km/h</li>
                <li style={{fontSize:12}}>{wind_dir}</li>
            </ul>
        </div>
    );
};


// This component returns 5 hourly forecast components.
const HourlyForecast = (props) => {

    // Collect the argument and store it into the variable "weatherData" for further uses.
    const {weatherData} = props;

    // Get the current time to display 5 next hours.
    var current_time = weatherData?.current?.last_updated_epoch;

    // Get the full day weather forecast list.
    var dates = weatherData?.forecast?.forecastday[0].hour;

    // Get to the correct timeslot of in the full-day list.
    var i = 0;
    while (i < dates.length && dates[i].time_epoch <= current_time) {
        i++;
    }

    // Create the new array to store the correct next 5 hours weather forecast.
    var newArray;
    if (i <= 20) {
        newArray = dates.slice(i, i+4);
    } else {
        newArray = dates.slice(i).concat(weatherData?.forecast?.forecastday[1].hour.slice(0, 4-24+i));
    }
    
    // Render the component.
    return (
        <div className="hourly-container">                
            <HourlyComponent time={"Now"} icon={weatherData?.current?.condition?.icon} 
            temp_c={weatherData?.current?.temp_c} wind_kph={weatherData?.current?.wind_kph} wind_dir={weatherData?.current?.wind_dir}/>        
            <HourlyComponent time={newArray[0].time.slice(10)} icon={newArray[0].condition?.icon}
            temp_c={newArray[0].temp_c} wind_kph={newArray[0].wind_kph} wind_dir={newArray[0].wind_dir}/>
            <HourlyComponent time={newArray[1].time.slice(10)} icon={newArray[1].condition?.icon}
            temp_c={newArray[0].temp_c} wind_kph={newArray[1].wind_kph} wind_dir={newArray[1].wind_dir}/>
            <HourlyComponent time={newArray[2].time.slice(10)} icon={newArray[2].condition?.icon}
            temp_c={newArray[0].temp_c} wind_kph={newArray[2].wind_kph} wind_dir={newArray[2].wind_dir}/>
            <HourlyComponent time={newArray[3].time.slice(10)} icon={newArray[3].condition?.icon}
            temp_c={newArray[0].temp_c} wind_kph={newArray[3].wind_kph} wind_dir={newArray[3].wind_dir}/>            
        </div>
    );    
};

// Render the main component.
export default HourlyForecast;

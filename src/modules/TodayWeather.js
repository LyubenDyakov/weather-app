// This component returns the forecasted min & max temperature in a day of the location.
const MinMaxTemp = (props) => {

    // Collect the argument and store it into the variable "weatherData" for further uses (finding the min & max temperature).
    const {weatherData} = props;
    return (
        <div>
        <span className="today">
            <p>Today</p>
            <img className="iconToday" src={weatherData?.forecast?.forecastday[0]?.day?.condition?.icon} alt="today-icon"></img>
            <div className="min">
                {Math.round(weatherData?.forecast?.forecastday[0]?.day?.mintemp_c)}°C
            </div>                
            <div>
                {Math.round(weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c)}°C
            </div>                 
        </span>
        </div>
    );
};


// This component returns the specific weather informations in a day of the locaton.
// This includes total snow, percentage of snow & rain, visibility.
const WeatherDetails = (props) => {

    // Collect the arguments and store it into variables, which represent the name & value of the weather detail.
    const {name, value} = props;
    return (
      <div>
          <ul>
            <li>{name}</li>
            <li>{value}</li>
         </ul>            
      </div>  
    );
};


// This component returns the number of open lifts of the location.
const OpenLifts = (props) => {

    // Collect the arguments and store it into variables, which returns the number of open lifts.
    const {openLifts, totalLifts} = props;    
    return (
        <div>
            <b>Open Lifts</b>
            {openLifts}/{totalLifts}
        </div>
    );
};


// This component is the container that contains every weather information of the current date of the location.
const TodayWeather = (props) => {

    // Collect the arguments and store it into variables, which have the general weather information and the lifts information.
    const {weatherData, skiData} = props;    
    
    // Create placeholder variables to store the number of open lifts.
    var open = 0;        
    var total = 0;

    // If the ski lifts' information is available.
    if (!(typeof skiData.data === 'undefined')) {

        // Store the values into the variables.
        open = skiData.data.lifts.stats.open;
        total = Object.keys(skiData.data.lifts.status).length;
    }
    
    // Render the component.
    return (
        <div className="today-container">                
            <MinMaxTemp weatherData={weatherData}/>
            <hr/>        
            <b>Snow Fall</b>
            <div className="snowFallToday">
            <WeatherDetails name={"Total Snow"} value={weatherData.forecast.forecastday[0].day.totalsnow_cm + " cm"}/>
            <WeatherDetails name={"Snow Percentage"} value={weatherData.forecast.forecastday[0].day.daily_chance_of_snow + "%"}/>
            <WeatherDetails name={"Rain Percentage"} value={weatherData.forecast.forecastday[0].day.daily_chance_of_rain + "%"}/>
            <WeatherDetails name={"Visibility"} value={weatherData.forecast.forecastday[0].day.avgvis_km + "km"}/>
            </div>
            <hr/>        
            <OpenLifts openLifts={open} totalLifts={total}/>              
        </div>
    );    
};

// Render the main component.
export default TodayWeather;

import React from 'react';
import Form from './Form';
import CurrentWeather from './CurrentWeather';
import SavedLocations from './SavedLocations';
import ErrorMessage from './ErrorMessage';

import './App.css';

var API_KEY = "571ea973dc2cdd20ba0988f71e0d2887";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherName: "",
            savedLocations: JSON.parse(localStorage.getItem("weather-queries"))
        };
    }

    componentDidMount = () => {
        this.makeApiRequest(this.state.savedLocations[0]);
    }

    render = () => {
        return (
            <div>
                <h1>React Weather</h1>
                <h3>Welcome back.</h3>
                <h3>Where in the world are you interested in?</h3>
                <Form
                    placeholderText="ie. Seattle, 98115"
                    onSubmit={(query) => {
                        this.makeApiRequest(query);
                    }}
                />
                <div className="container">
                    <div className="row">
                        {!this.state.isError ? (
                            <CurrentWeather
                                weatherName={this.state.weatherName}
                                weatherIcon={this.state.weatherIcon}
                                weatherTemp={this.state.weatherTemp}
                                weatherTempRange={this.state.weatherTempRange}
                                weatherHumidity={this.state.weatherHumidity}
                                weatherDescription={this.state.weatherDescription}
                                onSave={() => {
                                    console.log('saved', this.state.searchQuery);
                                    this.saveQuery(this.state.searchQuery);
                                }}
                            />
                        ) : (
                            <ErrorMessage/>
                        )}
                        {this.state.savedLocations.length !== 0 && (
                            <SavedLocations
                                savedLocations={this.state.savedLocations}
                                onLocationClick={(location) => {
                                    console.log('click', location);
                                    this.makeApiRequest(location);
                                }}
                                onLocationRemoved={(location) => {
                                    console.log('removed', location);
                                    this.removeQuery(location);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    removeQuery = (query) => {
        var filteredList = this.state.savedLocations.filter(function (savedLocation) {
            return query !== savedLocation;
        });
        this.setState({
            savedLocations: filteredList
        });
        localStorage.setItem("weather-queries", JSON.stringify(filteredList));
    }

    saveQuery = (query) => {
        if (!this.state.savedLocations.includes(query)) {
            var newSavedLocations = this.state.savedLocations.concat([ query ]);
            this.setState({
                savedLocations: newSavedLocations
            });
            localStorage.setItem("weather-queries", JSON.stringify(newSavedLocations));
        }
    }

    makeApiRequest = (query) => {
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + API_KEY + "&units=imperial";
        var fetchPromise = fetch(url);
        fetchPromise.then((response) => {
            console.log('response', response);
            response.json().then((data) => {
                if (response.status === 200) {
                    this.setState({
                        weatherName: data.name,
                        weatherIcon: "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
                        weatherTemp: "Temperature: " + parseInt(data.main.temp, 10) + String.fromCharCode(176),
                        weatherTempRange: "Low: " + parseInt(data.main.temp_min, 10) + String.fromCharCode(176) + " High: " + parseInt(data.main.temp_max, 10) + String.fromCharCode(176),
                        weatherHumidity: "Humidity: " + data.main.humidity + "%",
                        weatherDescription: data.weather[0].main + " (" + data.weather[0].description + ")",
                        searchQuery: query,
                        isError: false
                    });
                } else {
                    console.error('error', data);
                    this.setState({
                        isError: true
                    });
                }
            });
        });
    }
}

export default App;

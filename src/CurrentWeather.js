import React from "react";

class CurrentWeather extends React.Component {
    render = () => {
        console.log('props', this.props);
        return (
            <div className="weather-data col-md-6">
                <h2 id="weather-name">{this.props.weatherName}</h2>
                <img id="weather-icon" src={this.props.weatherIcon} alt="weather icon"/>
                <p id="weather-temp">{this.props.weatherTemp}</p>
                <p id="weather-temp-range">{this.props.weatherTempRange}</p>
                <p id="weather-humidity">{this.props.weatherHumidity}</p>
                <p id="weather-description">{this.props.weatherDescription}</p>
                <button
                    id="weather-save"
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.onSave();
                    }}
                >Save</button>
            </div>
        );
    }
}

export default CurrentWeather;

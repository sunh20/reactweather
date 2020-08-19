import React from 'react';

class SavedLocations extends React.Component {
    render = () => {
        return (
            <div id="location-list" className="weather-queries col-md-6">
                <h2>Saved Locations</h2>
                <ul id="weather-list" className="list-group">
                    {this.props.savedLocations.map((location) => {
                        return (
                            <li className="list-group-item" key={location}>
                                <a href="#" className="query-name" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.onLocationClick(location);
                                }}>{location}</a>
                                <a href="#" className="remove-query" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.onLocationRemoved(location);
                                }}>Remove</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default SavedLocations;

import React from "react";

class ErrorMessage extends React.Component {
    render = () => {
        return (
            <div id="error-message" className="col-md-6">
                <h2>Sorry, that location doesn't appear to be valid. Please enter a valid city name or zip code.</h2>
            </div>
        );
    }
}

export default ErrorMessage;

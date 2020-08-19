import React from "react";

class ErrorMessage extends React.Component {
    render = () => {
        return (
            <div id="error-message" className="col-md-6">
                <p>Please enter a valid city name or zip code.</p>
            </div>
        );
    }
}

export default ErrorMessage;

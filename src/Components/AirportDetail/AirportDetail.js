import React, { Component } from "react";
import "./AirportDetail.css";

class AirportDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const airportRunways = this.props.airportRunways.map((runway, id) => {
      return (
        <div className="parent" key={runway.id}>
          <div>{runway.designator}</div>
          <div>{runway.length}</div>
          <div>{runway.width}</div>
          <div>{runway.compcode}</div>
          <div>{runway.lightintns}</div>
          <div>{runway.lightactv}</div>
        </div>
      );
    });
    return (
      <div>
        <div className="headingTxt">Airport Details</div>
        <form onSubmit={this.props.getAirportDetail}>
          <input
            className="airportInput"
            type="text"
            name="airportDetail"
            placeholder="Airport Code"
          />
          <input type="submit" value="Search" />
        </form>
        <div className="AirportDetailsContainer">
          <div className="Heading">
            <div>Name: </div>
            <div>City: </div>
            <div>State: </div>
            <div>Icao24: </div>
            <div>Ident: </div>
            <div>Latitude: </div>
            <div>Logitude: </div>
            <div>Elevation: </div>
          </div>
          <div className="Values">
            <div>{this.props.airportDetail.name}</div>
            <div>{this.props.airportDetail.servcity}</div>
            <div>{this.props.airportDetail.state}</div>
            <div>{this.props.airportDetail.icaoId}</div>
            <div>{this.props.airportDetail.ident}</div>
            <div>{this.props.airportDetail.latitude}</div>
            <div>{this.props.airportDetail.longitude}</div>
            <div>{this.props.airportDetail.elevation} Ft.</div>
          </div>
        </div>
        <div className="headingTxt">Runway Information</div>
        <div className="runwaycontainer">
          <div className="parent">
            <div>Designator</div>
            <div>Length</div>
            <div>Width</div>
            <div>Surface</div>
            <div>Lightintns</div>
            <div>Lightactv</div>
          </div>
          {airportRunways}
        </div>
      </div>
    );
  }
}

export default AirportDetail;

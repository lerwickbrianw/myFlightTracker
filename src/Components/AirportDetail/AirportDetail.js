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
          <div className="divR">{runway.designator}</div>
          <div className="divR">{runway.length}</div>
          <div className="divR">{runway.width}</div>
          <div className="divR">{runway.compcode}</div>
          <div className="divR">{runway.lightintns}</div>
          <div className="divR">{runway.lightactv}</div>
        </div>
      );
    });
    const clouds = this.props.clouds.map((cloud, id) => {
      return;
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
          <div className="airport">
            <div className="Heading">
              <div className="airportHeading">
                <div>Name: </div>
                <div>City: </div>
                <div>State: </div>
                <div>Icao24: </div>
                <div>Ident: </div>
                <div>Latitude: </div>
                <div>Logitude: </div>
                <div>Elevation: </div>
              </div>
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
          <div className="weather">
            <div className="Heading">
              <div>Flight Rules:</div>
              <div>Time:</div>
              <div>Wind:</div>
              <div>Visibility (sm):</div>
              <div>Temperature:</div>
              <div>Dewpoint</div>
              <div>Altimeter:</div>
              <div>Clouds (AGL):</div>
              {/* <div>METAR:</div> */}
            </div>
            <div className="Values">
              <div>{this.props.flightRules}</div>
              <div>{this.props.time}</div>
              <div>
                {`${this.props.windDirection || this.props.windDirRepr} at ${
                  this.props.windSpeed
                }   Gust ${this.props.windGust}              
                `}
              </div>
              <div>{this.props.visibility}</div>
              <div>{this.props.temperature}</div>
              <div>{this.props.dewpoint}</div>
              <div>{this.props.altimeter}</div>
              <div>
                {this.props.clouds.map((cloud, id) => {
                  return (
                    <div key={id}>{cloud.repr ? `${cloud.repr}` : "Clear"}</div>
                  );
                })}
              </div>
              {/* <div>{this.props.sanitized}</div> */}
            </div>
          </div>
        </div>
        <div className="headingTxt">Runway Information</div>
        <div className="runwaycontainer">
          <div className="runwayparent">
            <div className="divR">Designator</div>
            <div className="divR">Length</div>
            <div className="divR">Width</div>
            <div className="divR">Surface</div>
            <div className="divR">Lighting Intensity</div>
            <div className="divR">Light Activation</div>
          </div>
          {airportRunways}
        </div>
      </div>
    );
  }
}

export default AirportDetail;

import React, { Component } from "react";
import "./AircraftDetail.css";

class AircraftDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const aircraftPhotosArray = this.props.aircraftPhotos || [];
    const aircraftPhotos = aircraftPhotosArray.map((item, index) => {
      return (
        <div className="photos">
          <a href={item.link} target="_blank">
            <img style={{ height: 200 }} key={index} src={item.image} alt="" />
          </a>
        </div>
      );
    });

    const aircraftFlightsArray = this.props.aircraftFlights || [];
    const aircraftFlights = aircraftFlightsArray.map((flight, id) => {
      return (
        <div className="pflights" key={flight.id}>
          <div className="divA">
            {new Date(flight.firstSeen * 1000).toLocaleDateString()}{" "}
            {new Date(flight.firstSeen * 1000).toLocaleTimeString()}
          </div>
          <div className="divA">{flight.estDepartureAirport}</div>
          {new Date(flight.lastSeen * 1000).toLocaleDateString()}{" "}
          {new Date(flight.lastSeen * 1000).toLocaleTimeString()}
          <div className="divA">{flight.estArrivalAirport}</div>
        </div>
      );
    });
    return (
      <div>
        <div className="headingTxt">Aircraft Details</div>
        <form onSubmit={this.props.getAircraftDetail}>
          <input
            className="inputCity"
            type="text"
            name="aircraftDetail"
            placeholder="Tail Number..."
          />
          <input type="submit" value="Search" />
        </form>
        <div className="AircraftDetailsContainer">
          <div className="Heading">
            <div>Tail Number: </div>
            <div>Year: </div>
            <div>Manufacturer: </div>
            <div>Model: </div>
            <div>Serial Number: </div>
            <div>Registered Owner: </div>
            <div>Engine(s)</div>
            <div>Registration Ends: </div>
            <div>ICAO24 Code: </div>
          </div>
          <div className="Values">
            <div>{this.props.aircraftDetail.registration}</div>
            <div>{this.props.aircraftDetail.built}</div>
            <div>{this.props.aircraftDetail.manufacturername}</div>
            <div>{this.props.aircraftDetail.model}</div>
            <div>{this.props.aircraftDetail.serialnumber}</div>
            <div>{this.props.aircraftDetail.owner}</div>
            <div>{this.props.aircraftDetail.engines}</div>
            <div>{this.props.aircraftDetail.reguntil}</div>
            <div>{this.props.aircraftDetail.icao24}</div>
          </div>
        </div>
        <div className="headingTxt">Photos</div>
        <div className="photos">{aircraftPhotos}</div>
        <div className="headingTxt">Past Flight Information</div>
        <div className="pastFlightsContainer">
          <div className="pastFlightsParent">
            <div className="divA">Departure Time</div>
            <div className="divA">Departure Airport</div>
            <div className="divA">Arrival Time</div>
            <div className="divA">Arrival Airport</div>
          </div>
          <div> {aircraftFlights}</div>
        </div>
      </div>
    );
  }
}
export default AircraftDetail;

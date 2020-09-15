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
      </div>
    );
  }
}
export default AircraftDetail;

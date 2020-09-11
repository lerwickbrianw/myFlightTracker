import React, { Component } from "react";
import "./AircraftDetail.css";
import Button from "react-bootstrap/Button";

class AircraftDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   registration: "",
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.registration.value);
    this.props.aircraftDetail(event);
  };
  render() {
    return (
      <div>
        <div>Aircraft Detail</div>
        {/* <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Tail Number"
            onChange={this.handleSearch}
          />
          <input onClick={this.handleSubmit} type="submit" value="Search" />
        </form> */}
        <form onSubmit={this.handleSubmit}>
          <input
            className="inputCity"
            // onChange={this.props.handleChange}
            // value={this.props.registration}
            type="text"
            name="registration"
            placeholder="Tail Number..."
          />
          <input type="submit" value="Search" />
          {/* <input
            className="inputState"
            onChange={this.props.handleChange}
            value={this.props.state}
            type="text"
            name="state"
            placeholder="State..."
          />
          <input
            className="inputCountry"
            onChange={this.props.handleChange}
            value={this.props.country}
            type="text"
            name="country"
            placeholder="Country..."
          /> */}

          {/* <Button
            className="getweather"
            onClick={this.handleSubmit}
            variant="secondary"
          >
            Search
          </Button> */}
        </form>
        {/* <div>{this.props.registration}</div> */}
      </div>
    );
  }
}
export default AircraftDetail;

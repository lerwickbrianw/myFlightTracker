import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Home from "../Home/Home";
import AirportDetail from "../AirportDetail/AirportDetail";
import AircraftDetail from "../AircraftDetail/AircraftDetail";
import { Route, Switch, Link } from "react-router-dom";

const backendUrl =
  process.env.REACT_APP_BACKEND_URL ||
  "https://myflighttrackerbackend.herokuapp.com";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraftDetail: "",
      aircraftPhotos: [],
      airportDetail: "",
      airportRunways: [],
      beginTime: (Date.now() / 1000 - 2592000).toFixed(0),
      endTime: (Date.now() / 1000).toFixed(0),
      aircraftFlights: [],
    };
  }

  getAirportDetail = async (event) => {
    event.preventDefault();
    console.log(event.target.airportDetail);
    let airportId = event.target.airportDetail.value.toUpperCase();
    let response = await axios.get(`${backendUrl}/api/airport/${airportId}`);
    this.setState({
      airportDetail: response.data.airport,
      airportRunways: response.data.runways,
    });
    console.log(response.data.runways);
  };

  getAircraftDetail = async (event) => {
    event.preventDefault();
    console.log(event.target.aircraftDetail.value);
    let tailnumber = event.target.aircraftDetail.value.toUpperCase();
    let response = await axios.get(
      `${backendUrl}/api/aircraft/${tailnumber}`
      // `${backendUrl}/api/aircraft/N16387`
    );
    this.setState({
      aircraftDetail: response.data.aircraft[0],
    });
    console.log(this.state.aircraftDetail);
    console.log(response);
    this.getAircraftPhotos();
    this.getAircraftFlights();
  };

  getAircraftPhotos = async (event) => {
    console.log(this.state.aircraftDetail.icao24);
    let response = await axios.get(
      `https://www.airport-data.com/api/ac_thumb.json?m=${this.state.aircraftDetail.icao24}&n=10`
    );
    this.setState({
      aircraftPhotos: response.data.data,
    });
    console.log(this.state.aircraftPhotos);
  };
  getAircraftFlights = async (event) => {
    let response = await axios.get(
      `https://cherokee235:Ilike2Fly@opensky-network.org/api/flights/aircraft?icao24=${this.state.aircraftDetail.icao24}&begin=${this.state.beginTime}&end=${this.state.endTime}`
    );
    console.log(response.data);
    this.setState({
      aircraftFlights: response.data,
    });
    console.log(this.state.aircraftFlights);
  };
  render() {
    return (
      <div className="App">
        <header className="navHeader">
          <Link to="/">
            <button type="button">myFlightTracker</button>
          </Link>
          <Link to="/api/airport">
            <button type="button">Airport</button>
          </Link>

          <Link to="/api/aircraft">
            <button type="button">Aircraft</button>
          </Link>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route
              path="/api/airport"
              handleChange={this.handleChange}
              airportDetail={this.state.airportDetail}
              airportRunways={this.state.airportRunways}
              component={(routerProps) => (
                <AirportDetail
                  {...this.state}
                  {...routerProps}
                  getAirportDetail={this.getAirportDetail}
                />
              )}
            ></Route>
            <Route
              path="/api/aircraft"
              handleChange={this.handleChange}
              aircraftDetail={this.state.aircraftDetail}
              aircraftFlights={this.state.aircraftFlights}
              component={(routerProps) => (
                <AircraftDetail
                  {...this.state}
                  {...routerProps}
                  getAircraftDetail={this.getAircraftDetail}
                  getAircraftPhotos={this.getAircraftPhotos}
                  getAircraftFlights={this.getAircraftFlights}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

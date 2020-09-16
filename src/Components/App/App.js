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
      altimeter: "",
      clouds: [],
      dewpoint: "",
      flightRules: "",
      sanitized: "",
      temperature: "",
      time: "",
      visibility: "",
      windDirection: "",
      windDirRepr: "",
      windGust: "",
      windSpeed: "",
      windVariableDir: [],
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
    this.getAirportWeather();
    console.log(response.data.runways);
  };
  getAirportWeather = async (event) => {
    console.log(this.state.airportDetail);
    let airportId = this.state.airportDetail.icaoId;
    console.log(airportId);
    let response = await axios.get(
      `https://avwx.rest/api/metar/${airportId}?token=fcax4RruAa_kWpUbkNvd-K73MayQTBYAxg6ZLYUVwfY`
    );
    console.log(response.data);
    this.setState({
      altimeter: response.data.altimeter.value,
      clouds: response.data.clouds,
      dewpoint: response.data.dewpoint.value,
      flightRules: response.data.flight_rules,
      sanitized: response.data.sanitized,
      temperature: response.data.temperature.value,
      time: response.data.time.repr,
      visibility: response.data.visibility.value,
      windDirection: response.data.wind_direction.value,
      windDirRepr: response.data.wind_direction.repr,
      // windGust: response.data.wind_gust.value,
      windSpeed: response.data.wind_speed.value,
      windVariableDir: response.data.wind_variable_direction,
    });
    if (!response.data.wind_gust) {
      this.setState({
        windGust: "",
      });
    } else {
      this.setState({
        windGust: response.data.wind_gust.value,
      });
    }
    console.log(this.state.clouds);
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
            <button className="button" type="button">
              myFlightTracker
            </button>
          </Link>
          <Link to="/api/airport">
            <button className="button" type="button">
              Airport
            </button>
          </Link>

          <Link to="/api/aircraft">
            <button className="button" type="button">
              Aircraft
            </button>
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
                  getAirportWeather={this.getAirportWeather}
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

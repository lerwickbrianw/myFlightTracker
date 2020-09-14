import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Home from "../Home/Home";
import AirportDetail from "../AirportDetail/AirportDetail";
import AircraftDetail from "../AircraftDetail/AircraftDetail";
import { Route, Switch, Link, Redirect } from "react-router-dom";

const backendUrl =
  process.env.REACT_APP_BACKEND_URL ||
  "https://myflighttrackerbackend.herokuapp.com";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraftDetail: "",
      aircraftPhotos: [],
    };
  }

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
  };

  getAircraftPhotos = async (event) => {
    // event.preventDefault();
    console.log(this.state.aircraftDetail.icao24);
    let response = await axios.get`https://www.airport-data.com/api/ac_thumb.json?m=a10063&n=10`;
    //  let response = await axios.get`https://www.airport-data.com/api/ac_thumb.json?m=${this.state.aircraftDetail.icao24}&n=10`;
    console.log(response.data.data);
    this.setState({
      aircraftPhotos: response.data.data,
    });
    console.log(this.state.aircraftPhotos);
  };
  render() {
    return (
      <div className="App">
        <header className="navHeader">
          <Link to="/">myFlightTracker</Link>
          <Link to="/api/airport">Airport</Link>
          <Link to="/api/aircraft">Aircraft</Link>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route
              path="/api/airport"
              component={() => <AirportDetail />}
            ></Route>
            <Route
              path="/api/aircraft"
              handleChange={this.handleChange}
              aircraftDetail={this.state.aircraftDetail}
              component={(routerProps) => (
                <AircraftDetail
                  {...this.state}
                  {...routerProps}
                  getAircraftDetail={this.getAircraftDetail}
                  getAircraftPhotos={this.getAircraftPhotos}
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

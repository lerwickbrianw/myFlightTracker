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
  constructor() {
    super();
    this.state = {
      registration: "",
    };
  }

  getAircraftDetail = async (event) => {
    console.log(event.target.registration.value);
    let response = await axios.get(
      `${backendUrl}/api/aircraft/${event.target.registration.value}`
      // `${backendUrl}/api/aircraft/N16387`
    );
    this.setState({
      registration: response.data.aircraft,
    });
    console.log(this.state.registration);
    console.log(response);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
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
              registration={this.state.registration}
              component={(routerProps) => (
                <AircraftDetail
                  {...this.state}
                  {...routerProps}
                  aircraftDetail={this.getAircraftDetail}
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

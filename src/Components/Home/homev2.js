import React, { Component, useState, useEffect } from "react";

import "./Home.css";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neLat: "43.8276067",
      neLng: "-89.8027526",
      swLat: "43.029763",
      swLng: "-87.597247",
      activeFlights: [],
      selectedFlight: null,
    };
    this.map = React.createRef();
  }
  componentDidMount = async () => {
    const response = await Axios.get`https://Cherokee235:Ilike2Fly@opensky-network.org/api/states/all?lamin=42.355&lomin=-91.15&lamax=43.9&lomax=-86.6`;
    this.setState({
      activeFlights: response.data.states,
    });
    console.log(this.state.activeFlights);
  };
  getMapExtents = () => {
    let ne = this.map.getBounds().getNorthEast();
    let sw = this.map.getBounds().getSouthWest();
    console.log(ne.lat() + ";" + ne.lng());
    console.log(sw.lat() + ";" + sw.lng());
    this.setState({
      neLat: ne.lat(),
      neLng: ne.lng(),
      sw: sw.lat(),
      sw: sw.lng(),
    });
  };
  //   handleMarkerClick = (flight) => {
  //     this.setState({ selectedFlight: flight });
  //   };
  render() {
    const GoogleMapExample = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          ref={(map) => {
            this.map = map;
          }}
          onIdle={props.onMapIdle}
          defaultCenter={{ lat: 43.43, lng: -88.7 }}
          defaultZoom={10}
        >
          {/* {this.state.activeFlights.map((flight) => (
            <Marker
              key={flight[0]}
              position={{
                lat: flight[6],
                lng: flight[5],
              }}
              //   onClick={this.handleMarkerClick(flight)}

              //     e.preventDefault();
              //     this.setState({ selectedFlight: flight });
              //     console.log(this.state.selectedFlight);
              //   }}
            /> */}
          ))}
          {/* {this.state.selectedFlight && (
            <InfoWindow
              position={{
                // lat: this.state.selectedFlight[6],
                // lng: this.state.selectedFlight[5],
                lat: 43.0465,
                lng: -87.856,
              }}
            />
          )} */}
        </GoogleMap>
      ))
    );
    const activeFlights = this.state.activeFlights.map((flight, index) => {
      return <li key={index}>{flight}</li>;
    });

    return (
      <div>
        <div className="activeFlights">
          <div>Active Flights</div>
          <ul>{activeFlights}</ul>
        </div>
        <GoogleMapExample
          onMapIdle={() => {
            this.getMapExtents();
            // let ne = this.map.getBounds().getNorthEast();
            // let sw = this.map.getBounds().getSouthWest();
            // console.log("ne", ne);
            // console.log(ne.lat() + ";" + ne.lng());
            // console.log(sw.lat() + ";" + sw.lng());
          }}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBxarPXcJpq8mYO-JH6XwEIFr7EwljDAaY`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default Home;

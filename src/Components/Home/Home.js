import React, { Component } from "react";
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
    const response = await Axios.get(
      `https://Cherokee235:Ilike2Fly@opensky-network.org/api/states/all?lamin=${this.state.swLat}&lomin=${this.state.neLng}&lamax=${this.state.neLat}&lomax=${this.state.swLng}`
    );
    this.setState({
      activeFlights: response.data.states,
    });
    console.log(this.state.activeFlights[0][0]);
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
  handleMarkerClick = (flight) => {
    this.setState({ selectedFlight: flight });
  };
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
          {this.state.activeFlights.map((flight) => (
            <Marker
              key={flight[0]}
              position={{
                lat: flight[6],
                lng: flight[5],
              }}
              onClick={(e) => {
                // e.preventDefault();
                this.setState({ selectedFlight: flight });
                console.log(this.state.selectedFlight);
              }}
            />
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
      return (
        <div className="flights" key={flight.index}>
          <div className="divf">{flight[0]}</div>
          <div className="divf">{flight[1]}</div>
          <div className="divf">{flight[2]}</div>
          <div className="divf">{flight[7]}</div>
          <div className="divf">{flight[8]}</div>
          <div className="divf">{flight[9]}</div>
          <div className="divf">{flight[10]}</div>
          <div className="divf">{flight[11]}</div>
        </div>
      );
    });

    return (
      <div>
        <div className="activeFlights">
          <div className="flightTxt">Active Flights</div>
          <div className="flightcontainer">
            <div className="flightheading">
              <div className="divf">ICAO24</div>
              <div className="divf">Tail Number</div>
              <div className="divf">Origin</div>
              <div className="divf">Baro Altitude</div>
              <div className="divf">On Ground</div>
              <div className="divf">Velocity</div>
              <div className="divf">True Track</div>
              <div className="divf">Verticle Rate</div>
            </div>
            <div className="flightdetailscontainer">{activeFlights}</div>
          </div>
        </div>
        <GoogleMapExample
          onMapIdle={() => {
            // this.getMapExtents();
            let ne = this.map.getBounds().getNorthEast();
            let sw = this.map.getBounds().getSouthWest();
            console.log(ne.lat() + ";" + ne.lng());
            console.log(sw.lat() + ";" + sw.lng());
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

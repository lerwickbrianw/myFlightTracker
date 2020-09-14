import React, { Component } from "react";
import "./Home.css";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";

class Home extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
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
        />
      ))
    );
    return (
      <div>
        <GoogleMapExample
          onMapIdle={() => {
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

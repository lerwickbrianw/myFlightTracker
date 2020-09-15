# myFlightTracker

## Summary:

Ever hear an airplane passing overhead and want to find out as much detail as you can about the flight or the plane? MyFlightTracker will enable you to see flights active flights in your area, search for a flight or aircraft tail number to see active or historical flight information. In addition, the app will allow you to search for and see detailed information about any airport.

## User Stories

1. As an app user, I want to be able to view all active flights in my area through a list of flights as well as being displayed on a map.
2. As an app user, I want to be able to search for a specific flight by tail number or flight number
3. As an app user, I want to be able to see detailed information about the selected aircraft
4. As an app user, I want to see detailed information about a selected airport
5. As an app user, I want to be able to see METAR and TAF information for a specific airport
6. As an app user, I want to be able to see any available photos of the selected aircraft
7.

Maps.google API Key
AIzaSyBxarPXcJpq8mYO-JH6XwEIFr7EwljDAaY

## Data Sources:

- Airport Physical Data: Airports.csv file from adds-faa.opendata.arcgis.com
- Runway Physical Data: Runways.csv file from adds-faa.opendata.arcgis.com
- Airport Weather Data: https://avwx.docs.apiary.io/#
- Aircraft Physical Data: aircraftDatabase.csv file from opensky network.org
- Aircraft Photos: https://www.airport-data.com/api/ac_thumb.json?m=XXXXXX&n=N
- Aircraft Route Data: https://opensky-network.org/api

### Data Flow

![Data Flow](/Planning/myFlightTracker_data_flow.png)

### WireFrame - Home Page

![Data Flow](/Planning/myFlightTracker_Home.png)

### WireFrame - Flight Detail Page

![Data Flow](/Planning/myFlightTracker_Flight_Detail.png)

### WireFrame - Aircraft Detail Page

![Data Flow](/Planning/MyFlightTracker_Aircraft_Detail.png)

### WireFrame - Airport Detail Page

![Data Flow](/Planning/myFlightTracker_Airport_Detail.png)

## Activities:

### Frontend:

1. App.js
2. Home.js
3. FlightDetail.js
4. Aircraft.js
5. Airport.js

#### Backend:

1. Database prep
   a. Cleanse data files to remove extra information
2. Controllers files
3. Models files
4. Axios calls to opensky apis

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

http://maps.google.com/mapfiles/kml/pal2/icon56.png

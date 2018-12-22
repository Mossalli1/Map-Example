// this page doesn't use



import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo'
import { doesNotReject } from 'assert';

export default class App extends React.Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };


  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };
  
  render() {
    return (

      
      <View style={styles.container}>

      {/* //adding Map */}
        <MapView
          style={{ flex: 1 }}
          region = {this.state.mapRegion}
          // initialRegion={{
          //   latitude: 1.3521,
          //   longitude: 103.851959,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          >

        {/* Adding Pointer */}
          <MapView.Marker 
            coordinate={{
              latitude: 1.3521,
              longitude: 103.851959,
            }}
          >
            <View style={styles.radius}>
              <View style={styles.marker}></View>
            </View>
            
          </MapView.Marker>
          
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  radius :{
    height: 50,
    width :50,
    // overflow : 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 225, 0.3)',
    borderRadius : 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  marker : {
    height: 20,
    width :20,
    borderWidth: 3,
    borderColor: 'white',
    // overflow : 'hidden',
    backgroundColor: '#007AFF',
    borderRadius : 10,
  }

});
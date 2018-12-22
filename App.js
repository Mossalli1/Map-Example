import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class App extends Component {
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
        {/* <Text style={styles.paragraph}>
          Location
        </Text> */}
        
        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView
              // style={{flex:1}}
              style={{ alignSelf: 'stretch', height: 500 }}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
            >

              <MapView.Marker
                coordinate={this.state.mapRegion}
                title="My Location"
                description={this.state.locationResult}
              >

                <View style={styles.radius}>
                  <View style={styles.marker}></View>
                </View>
              
              </MapView.Marker>
            
            </MapView>
        }
        
        {/* <Text>
          Location: {this.state.locationResult}
        </Text> */}
      </View>
        
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
  },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#34495e',
  // },

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
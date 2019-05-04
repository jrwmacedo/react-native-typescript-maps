import React, { Component } from 'react';
import MapView, { Region, LatLng, AnimatedRegion, MarkerAnimated, MarkerProps } from 'react-native-maps';
import { StyleSheet, View, Platform } from 'react-native';

const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = 0.5;
const LATITUDE = 0;
const LONGITUDE = 0;
const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 1,
    longitudeDelta: 1,
}

const myMarkers = [
    {
        coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
        },
        title: "Best Place",
        description: "This is the best place in Portland"

    },
    {
        coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",

    },
    {
        coordinate: {
            latitude: 45.5230786,
            longitude: -122.6701034,
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",

    },
    {
        coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",

    },
]

interface IMapProp {


}
interface IMapState {
    latitude: number,
    longitude: number,
    routeCoordinates: Array<LatLng>,
    distanceTravelled: number,
    prevLatLng?: any,
    coordinate: AnimatedRegion,
    markers: Array<MarkerProps>
}

export default class Map extends Component<IMapProp, IMapState> {
    watchID: number;
    marker: any;
    newCoordinate: Region;

    constructor(props: IMapProp) {
        super(props);


        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion(initialRegion),
            markers: []
        };
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });


    componentDidMount() {
        setTimeout(this.getCurrentLocation, 10);
    }

    getCurrentLocation = () => {
        try {

            console.log('Getting current position...');


            navigator.geolocation.getCurrentPosition(position => {
                const { coordinate, routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;
                this.newCoordinate = {
                    latitude,
                    longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };
                console.log('Step 4...');
                if (Platform.OS === "android") {
                    if (this.marker) {
                        this.marker._component.animateMarkerToCoordinate(this.newCoordinate, 500);

                    }
                }
                else {
                    coordinate.timing(this.newCoordinate).start();
                }

                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([this.newCoordinate]),
                    distanceTravelled: distanceTravelled,
                    prevLatLng: this.newCoordinate,
                    coordinate: new AnimatedRegion(this.newCoordinate),
                    markers: myMarkers
                });
            }, error => console.log(error, error.message), { enableHighAccuracy: false, timeout: 5000 });
        } catch (e) {
            console.info(e);
        }
    }

    componentWillUnmount() {
        console.log('Position Cleaned');
        navigator.geolocation.clearWatch(this.watchID);
    }
    onRegionChange() {
        //console.log('onRegionChange', region);
        //  this.getMapRegion();
    }


    onRegionChangeComplete(region: Region) {
        console.log('onRegionChangeComplete', region);
    };

    onMapReady() {
    };

    render() {

        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    showsUserLocation
                    followsUserLocation
                    loadingEnabled
                    showsCompass
                    region={this.getMapRegion()}
                    onMapReady={this.onMapReady}
                    onRegionChange={this.onRegionChange}>

                    {!!this.state.latitude && !!this.state.longitude && <MarkerAnimated
                        ref={(marker: any) => {
                            this.marker = marker;
                        }}
                        coordinate={this.state.coordinate}
                    />
                    }
                    {this.state.markers.map((marker: any, index) => (
                        console.log(marker),
                        <MarkerAnimated
                            key={index}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                </MapView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'


    },
    map: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
});
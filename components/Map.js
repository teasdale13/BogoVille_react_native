import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from "react-native-maps/lib/components/MapMarker";

export default class Map extends Component{
    constructor(props){
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            altitude: 0,
            latlng: {
                latitude: 0,
                longitude: 0
            }
        };
    }

    /**
     * Fonction native de React Native qui présentement va chercher la localisation actuelle
     * de l'utilisateur et l'assigne a des states.
     */
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({latitude: position.coords.latitude});
            this.setState({longitude: position.coords.longitude});
            this.setState({altitude: position.coords.altitude});
            this.setState({latlng:{latitude: position.coords.latitude, longitude: position.coords.longitude}});

        }, (error)=>console.log(error));
    }

    /**
     * Lorsque le composant est "détruit" la recherche de la localisation est arrêté.
     */
    componentWillUnmount(): void {
        navigator.geolocation.clearWatch();
    }

    /**
     * Fonction qui est appelée lorsque l'utilisateur change la localisation sur la GoogleMap
     * et change le state dans le parent (Problem) avec la fonction passée en props.
     *
     * @param e event créé lorsque l'utilisateur change le point sur la map.
     */
    getPosition(e) {
        this.setState({latlng:{latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude}});

        this.props.updateLatLngFromChild(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude );
    }

    render(){
        return(
            <View style={styles.container} >
                <MapView
                    onPress={this.getPosition.bind(this)}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    camera={{
                        center: {
                            latitude: this.state.latitude,
                            longitude: this.state.longitude
                        },
                        zoom: 19,
                        heading: 1,
                        pitch: 1,
                        altitude: this.state.altitude
                    }}>

                    <MapMarker
                    coordinate={this.state.latlng}>
                    </MapMarker>
                </MapView>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 2,
    },
    map: {
        alignItems: 'center',
        alignContent: 'center',
        ...StyleSheet.absoluteFillObject,
    },
});
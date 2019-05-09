import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Container, Text, Button} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

export default class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = {
        headerTitle: "Prenez une photo",
        headerStyle: {
            backgroundColor: '#f4511e',
        }
    };

    render() {
        return (
            <Container>
                <Grid>
                    <Row style={{height: '80%'}}>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                            type={RNCamera.Constants.Type.back}
                            autoFocus={RNCamera.Constants.AutoFocus.on}
                            flashMode={RNCamera.Constants.FlashMode.auto}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                        />
                    </Row>
                    <Button block light onPress={this.takePicture.bind(this)}><Text>Prendre une photo</Text></Button>
                </Grid>
            </Container>
        );
    }

    /**
     * Fonction qui prend une photo et renvoie les données en base64
     * à la page (Problem);
     *
     * @returns {Promise<void>}
     */
    takePicture = async function () {
        const option = {quality: 0.4, forceUpOrientation: true, fixOrientation: true, base64: true};
        const data = await this.camera.takePictureAsync(option);
        this.props.navigation.navigate('Problem', {data: data.base64});
    }
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});
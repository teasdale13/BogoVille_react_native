import React, {Component} from 'react'
import {Container, Left, Right, Button, Text, Content, Radio, ListItem} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import CustomPicker from '../components/CustomPicker';
import Map from '../components/Map';
import {Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view/index'
import Comment from "../components/Comment";
import axios from 'axios/index';

export default class Problem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            comment: "",
            selected: false,
            latitudeNow: 0,
            longitudeNow: 0,
            latitudeMap: 0,
            longitudeMap: 0,
        };
        this.updateFromChild = this.updateFromChild.bind(this);
        this.commentFromChild = this.commentFromChild.bind(this);
        this.updateLatLngFromChild = this.updateLatLngFromChild.bind(this);
        this.postMedia = this.postMedia.bind(this);
    }

    /**
     * Fonction qui va chercher la position actuelle de l'utilisateur
     * lorsque la page est "montée" et le "stock" dans un state.
     */
    componentDidMount(): void {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({latitudeNow: position.coords.latitude});
            this.setState({longitudeNow: position.coords.longitude});

        }, (error) => console.log(error));
    }

    /**
     * Fonction passée en props à l'enfant (Map) pour récupérer la localisation
     * du point sur la map.
     *
     * @param latitude sur le point sur la map Google.
     * @param longitude sur le point sur la map Google
     */
    updateLatLngFromChild(latitude, longitude) {
        this.setState({latitudeMap: latitude});
        this.setState({longitudeMap: longitude});
    }

    /**
     * Fonction passée en props à l'enfant (CustomPicker) pour récupérer le type
     * de problème que l'utilisateur à sélectionné.
     *
     * @param idType le id du type qui est une FK pour insérer le problème.
     */
    updateFromChild(idType) {
        this.setState({type: idType});
    }

    /**
     * Fonction passée en props à l'enfant (Comment) pour récupérer le commentaire
     * de l'utilisateur.
     * @param comment commentaire passé par l'enfant.
     */
    commentFromChild(comment) {
        this.setState({comment: comment});
    }


    /**
     * Fonction qui insère les informations de la photo prise par l'utilisateur avant de signaler
     * le problème pour récupérer le id_media pour pouvoir le joindre au probleme.
     *
     * @param pictureData les données de la photo en base64.
     */
    postMedia(pictureData) {
        if ((this.state.selected || this.state.latitudeMap !== 0 && this.state.longitudeMap !== 0) && this.state.type !== 0) {
                if (pictureData !== undefined) {
                    axios.post('http://bogoville.xyz/rest/media', {
                            media: pictureData.toString(),
                            mime: "image/jpeg",
                            filename: null
                        },
                        {
                            auth: {
                                username: 'admin',
                                password: 'admin'
                            }
                        }).then((resp) => {
                        this.postProblem(resp.data);
                    });
                } else {
                    this.postProblem(null);
                }
            }else {
            alert("Des informations manquantes sont requise.");
        }
    }

    /**
     * Fonction qui signal un problème à la ville avec les informations que l'utilisateur
     * à entré.
     *
     * @param idMedia le id du média (photo) qui a été préalablement inséré.
     */
    postProblem(idMedia) {
        /* Vérification de la position (latitude)  */
        let latitude = this.state.selected ? this.state.latitudeNow :
            this.state.latitudeMap !== 0 ? this.state.latitudeMap : alert("Indiquez l'endroit du problème.");
        /* Vérification de la position (longitude)  */
        let longitude = this.state.selected ? this.state.longitudeNow :
            (this.state.longitudeMap !== 0 ? this.state.longitudeMap : alert("Indiquez l'endroit du problème."));

            axios.post('http://bogoville.xyz/rest/probleme', {
                    id_type: this.state.type,
                    id_media: idMedia,
                    latitude: latitude,
                    longitude: longitude,
                    id_ville: 1,
                    id_statut: 1,
                    commentaire: this.state.comment
                },
                {
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).then(function (response) {
                if (response.status === 200) {
                    alert("Problème transmit.");
                } else {
                    alert("Un problème est survenu.");
                }
            });

    }

    render() {
        /* Récupération de l'info (base64) qui provient de la page de la caméra lorsque l'utilisateur prend une photo
        * pour l'afficher dans la balise <Image> */
        const {navigation} = this.props;
        const data = navigation.getParam("data");

        return (
            <KeyboardAwareScrollView
                style={{backgroundColor: '#4c69a5'}}
                resetScrollToCoords={{x: 0, y: 0}}
                scrollEnabled={false}>
                <Container style={{paddingHorizontal: 10, margin: 0}}>
                    <Grid style={{height: '100%'}}>
                        <Row style={{height: '8%'}}>
                            <CustomPicker updateFromChild={this.updateFromChild}/>
                        </Row>
                        <Row style={{height: '9%'}}>
                            <Comment commentFromChild={this.commentFromChild}/>
                        </Row>
                        <Row style={{height: '35%'}}>
                            <Map updateLatLngFromChild={this.updateLatLngFromChild}/>
                        </Row>
                        <Row style={{height: '8%'}}>
                            <Content>
                                <ListItem selected={this.state.selected}
                                          onPress={() => this.setState({selected: !this.state.selected})}>
                                    <Left>
                                        <Text>Êtes-vous à l'endroit précis?</Text>
                                    </Left>
                                    <Right>
                                        <Radio selected={this.state.selected}
                                               onPress={() => this.setState({selected: !this.state.selected})}/>
                                    </Right>
                                </ListItem>
                            </Content>
                        </Row>
                        <Row>
                            <Col style={{width: '50%'}}>
                                <Image style={{height: 100, width: 50}}
                                       source={{uri: 'data:image/jpeg;base64,' + data}}/>
                            </Col>
                            <Col style={{width: '50%'}}>
                                <Button block light
                                        onPress={() => this.props.navigation.navigate('Photo')}><Text>Photo</Text></Button>
                            </Col>
                        </Row>
                        <Row>
                            <Button style={{width: '100%'}} block light
                                    onPress={() => this.postMedia(data)}><Text>Soumettre</Text></Button>
                        </Row>
                    </Grid>
                </Container>
            </KeyboardAwareScrollView>
        );
    }
}
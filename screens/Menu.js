import React, {Component} from 'react';
import {Body, Card, CardItem, Container, Content, Text} from "native-base";
import {Image, StyleSheet, TouchableHighlight} from "react-native";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "../Responsivator";


export default class Menu extends Component {

    render() {
        const {navigation} = this.props;
        const {navigate} = this.props.navigation;

        const villeNom = navigation.getParam('villeNom');
        const regionNom = navigation.getParam('regionNom');




        return (
            <Container>

                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.titleVille}>{villeNom}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body style={{justifyContent: 'center',
                                alignItems: 'center'}}>
                                <Image
                                    style={{width:responsiveWidth(80),height: responsiveHeight(20)}}
                                    source={require('./shawi.jpg')}

                                >


                                </Image>


                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <TouchableHighlight  onPress={() => navigate("VilleInRegion")}>
                            <Text>
                                {regionNom}
                            </Text>
                            </TouchableHighlight>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    titleVille: {
        fontSize: responsiveFontSize(3),
        fontFamily: 'roboto',
        alignContent: 'center',
        justifyContent: 'center'


    }


});


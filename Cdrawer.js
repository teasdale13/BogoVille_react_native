import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import {Body, Button, Container, Content, Header, Text} from "native-base";
import {DrawerItems} from 'react-navigation'
import {responsiveHeight, responsiveWidth} from './Responsivator'

let user_name = "Pickle";

export const Cdrawer = (props) => (

    <Container>
        <Header style={styles.drawerHeader}>
            <Body style={{alignContent:'center', flexDirection:'row', padding:10}}>
                <Button transparent onPress={() => this.props.navigation.navigate("Profil")}>
                <Image
                    style={styles.drawerImage}
                    source={require('./assets/img/monkeytiti.png')} />
                    <Text style={{fontSize:17,fontFamily:'roboto',marginLeft:20,color:'#fff',fontWeight:'bold'}}>{user_name}</Text>
                </Button>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>
    </Container>

);

const styles = StyleSheet.create({

    container: {
        flex:1
    },
    drawerHeader: {
        height: responsiveHeight(15),
        backgroundColor: '#01b8aa',

    },
    drawerImage: {
        height: responsiveHeight(5),
        width: responsiveWidth(10),

    }

});
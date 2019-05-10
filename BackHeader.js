import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import {withNavigation} from 'react-navigation'
import React, {Component} from "react";
import {StyleSheet,Platform} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from './Responsivator'

class BackHeader extends Component {


    render() {
        const {navigate} = this.props.navigation;
        return (

            <Header noShadow style={{backgroundColor: '#01b8aa'}}>
                <Left>
                    <Button transparent onPress={() => navigate("Menu")}>
                        <Icon name="arrow-back" style={{fontSize: 38}}/>
                    </Button>
                </Left>
                <Body style={styles.body}>
                    <Title style={styles.title}>
                        {this.props.title}
                    </Title>
                </Body>
                <Right>

                </Right>
            </Header>

        );
    }
}

const styles = StyleSheet.create({

    title:{
        fontSize:responsiveFontSize(3),
        fontFamily:'roboto',
        textAlign: 'center',
        justifyContent: 'center',
        position: Platform.OS === 'ios'?'absolute': 'relative',
    },
    body: {
        position: 'absolute',
        textAlign: 'center',
        alignItems: Platform.OS === 'ios'? 'center': 'center'
    }



});



export default withNavigation(BackHeader);
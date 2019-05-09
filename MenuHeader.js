import {Body, Button, Header, Icon, Input, Item, Left, Right, View} from "native-base";
import {withNavigation} from 'react-navigation'
import React, {Component} from "react";
import {StyleSheet, TouchableHighlight} from "react-native";
import {getInfo} from "./AxiosRequest";
import Menu from "./screens/Menu";
import {responsiveFontSize, responsiveHeight, responsiveWidth} from "./Responsivator";


class MenuHeader extends Component {


    constructor(props) {
        super(props);
        this.state = {
            ville: '',
            error: false,


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            ville: e.nativeEvent.text
        });
    }

    handleSubmit() {
        getInfo('ville', this.state.ville).then((res) => {
            if (res === 'Not Found') {
                this.setState({
                    error: 'ville inconnu'
                });
            } else {

                    getInfo('region',res.id_region).then((res2)=>{


                this.props.navigation.navigate('Menu', {
                    villeNom: res.nom,
                    regionNom: res2.nom

                });
                    });
                this.setState({
                    error: false,
                    ville: ''
                })
            }
        });
    }


    toggleDrawer = () => {

        this.props.navigationProps.toggleDrawer();

    };


    render() {

//
        const {navigate} = this.props.navigation;
        return (


            <Header noShadow style={{backgroundColor: '#01b8aa'}}>
                <Left>
                    <TouchableHighlight onPress={this.toggleDrawer.bind(this)}>

                            <Icon name="menu" style={{fontSize: responsiveFontSize(5),color:'#fff'}}/>

                    </TouchableHighlight>
                </Left>
                <Body style={{position: 'absolute', justifyContent: 'center',}}>

                    <View style={{justifyContent: 'center',width: responsiveWidth(60), height: responsiveHeight(30)}}>
                        <Item rounded >
                            <Input   style={styles.searchInput} placeholderTextColor="white" placeholder='Rechercher une ville...'
                                    onChange={this.handleChange}/>
                            <TouchableHighlight onPress={this.handleSubmit} >
                                <Icon style={{color: '#fff'}}  name='search'/>
                            </TouchableHighlight>
                        </Item>
                    </View>


                </Body>
                <Right>
                    <TouchableHighlight onPress={() => navigate("Profil")}>
                        <Icon name="person" style={{fontSize: responsiveFontSize(5), color:'#fff'}}/>

                    </TouchableHighlight>
                </Right>


            </Header>

        );
    }
}

const styles = StyleSheet.create({
    searchInput:{
        fontSize: responsiveFontSize(2),
        fontFamily: 'roboto',
        color: '#fff'

    }


});


export default withNavigation(MenuHeader);
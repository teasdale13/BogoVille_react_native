import React from "react";
import {Image, StyleSheet, Text, View} from 'react-native';
import {Container} from "native-base";


export default class Profil extends React.Component {

    render() {
        return (
            <Container>


                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                    {/* Flex box -> En haut */}

                    <View style={{
                        width: '100%',
                        height: '50%',
                        backgroundColor: 'steelblue',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Image
                            style={styles.profileimg}
                            source={require('./fatguy.jpg')}
                            height='100%'
                            width='30%'
                        />

                    </View>
                    {/* Flex box -> En bas */}
                    <View style={{width: '100%', height: '50%', backgroundColor: 'skyblue'}}>

                        <Text style={{fontSize:22,fontFamily:'roboto'}}>
                            Nom
                        </Text>

                        <Text style={{fontSize:22,fontFamily:'roboto'}}>
                            Courriel
                        </Text>




                    </View>
                </View>


                {/* Flex box -> Les deux box du bas */}
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                    {/* Flex box -> En haut */}
                    <View style={{width: '100%', height: '50%', backgroundColor: 'steelblue'}}>

                        <Text style={{fontSize:24,fontFamily:'roboto', fontWeight:'bold' }}>
                            Statut du dernier signalement:
                        </Text>


                    </View>
                    {/* Flex box -> En bas */}
                    <View style={{width: '100%', height: '50%', backgroundColor: 'skyblue'}}>


                    </View>
                </View>

            </Container>

        );
    }
}

const styles = StyleSheet.create({

    profileimg: {
        width: '75%',
        height: '75%',
        borderRadius: 30

    }


});
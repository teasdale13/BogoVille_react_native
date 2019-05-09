import React from "react";
import {View} from 'react-native';
import {Container} from "native-base";


export default class Connection extends React.Component {


    render() {
        return (
            <Container>

                {/* Flex box -> Moitier du haut */}
                <View style={{flex: 1, flexDirection: 'row'}}>

                    {/* Flex box -> A gauche */}
                    <View style={{width: '20%', height: '100%', backgroundColor: 'powderblue'}}/>

                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                        {/* Flex box -> En haut dans le milieu */}
                        <View style={{width: '100%', height: '50%', backgroundColor: 'red'}}/>
                        {/* Flex box -> En bas dans le milieu */}
                        <View style={{width: '100%', height: '50%', backgroundColor: 'blue'}}/>
                    </View>
                    {/* Flex box -> A droite */}
                    <View style={{width: '20%', height: '100%', backgroundColor: 'yellow'}}/>

                </View>

                {/* Flex box -> Les deux box du bas */}
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                    {/* Flex box -> En haut */}
                    <View style={{width: '100%', height: '50%', backgroundColor: 'steelblue'}}/>
                    {/* Flex box -> En bas */}
                    <View style={{width: '100%', height: '50%', backgroundColor: 'skyblue'}}/>
                </View>

            </Container>

        );
    }
}
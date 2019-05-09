import {createAppContainer, createDrawerNavigator, createStackNavigator} from "react-navigation";
import Menu from "./screens/Menu";
import Profil from "./screens/Profil";
import Report from "./screens/Report";
import React from "react";
import {Navigation} from 'react-native-navigation';
import MenuHeader from "./MenuHeader";
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import {Cdrawer} from "./Cdrawer";
import BackHeader from "./BackHeader";
import Evenement from "./screens/Evenements"
import VilleInRegion from "./screens/VilleInRegion";

export function registerScreens() {
    Navigation.registerComponent('screens.Menu', () =>
        gestureHandlerRootHOC(Menu));
    Navigation.registerComponent('screens.Profil', () =>
        gestureHandlerRootHOC(Profil));
    Navigation.registerComponent('screens.Report', () =>
        gestureHandlerRootHOC(Report));
    Navigation.registerComponent('screens.VilleInRegion',() =>
    gestureHandlerRootHOC(VilleInRegion));
}

registerScreens();


const MenuStack = createStackNavigator({




    Menu: {
        screen: Menu,
        navigationOptions: ({navigation}) =>
            ({
                header: <MenuHeader navigationProps={navigation}/>,

            }),
    },
});


const ProfilStack = createStackNavigator({

    Profil: {
        screen: Profil,
        navigationOptions: ({navigation}) =>
            ({
            header: <BackHeader title="Profil" navigationProps={navigation}/>,

        }),


    },

},

    );


const ReportStack = createStackNavigator({

    Report: {
        screen: Report,
        navigationOptions: ({navigation}) => ({
            header: <BackHeader title="Rapporter un probleme" navigationProps={navigation}/>,

        }),
    },
},

    );

const EvenementStack = createStackNavigator({

        Report: {
            screen: Evenement,
            navigationOptions: ({navigation}) => ({
                header: <BackHeader title="Liste des evenements" navigationProps={navigation}/>,

            }),
        },
    },

);

const VilleRegionStack = createStackNavigator({

        VilleInRegion: {
            screen: VilleInRegion,
            navigationOptions: ({navigation}) => ({
                header: <BackHeader title="Ville dans la region" navigationProps={navigation}/>,

            }),
        },
    },

);





const DrawerNavigator = createDrawerNavigator({

    MenuDraw: {
        screen: MenuStack,
        navigationOptions: {
            drawerLabel: 'Menu Principal',


        },
    },
    ProfilDraw: {

        screen: ProfilStack,
        navigationOptions: {
            drawerLabel: 'Profil',

        },
    },
    ReportDraw: {

        screen: ReportStack,
        navigationOptions: {
            drawerLabel: 'Rapporter un probleme',

        },

    },

        EvenementDraw: {

            screen: EvenementStack,
            navigationOptions: {
                drawerLabel: 'Evenements',

            },

        },
    VilleDraw: {
        screen: VilleRegionStack,
        navigationOptions:{
            drawerLabel: 'Ville dans la region',
        },
    },

},
    {

        contentComponent: Cdrawer,
        contentOptions: {
            activeTintColor: '#01b8aa'
        }
      }
    );
const AppContainer = createAppContainer(DrawerNavigator);
export default AppContainer;
import {createAppContainer, createStackNavigator} from 'react-navigation';

import Problem from '../pages/Problem'
import Camera from "../components/Camera";

const RootStack = createStackNavigator(
    {
        Problem: Problem,
        Camera: Camera,
    },
    {
        initialRouteName: 'Problem',
    },

);

export const Navigator = createAppContainer(RootStack);


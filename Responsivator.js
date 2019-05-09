import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const responsiveHeight = (h) => {
    return height*(h/100);
};

export const responsiveWidth = (w) => {
    return width*(w/100);
};

export const responsiveFontSize = (f) => {
    const tempHeight = (16/9)*width;
    return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2))*(f/100);
};
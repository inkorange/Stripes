
let primaryColor = "#3366CC";
let baseTextColor = "#212121";
let inactiveColor = "#dbdbdb";
let errorColor = "#DB4437";
let inactiveErrorColor = "#DB8D86";
let secondaryColor = "";
let tertiaryColor = "";
let borderColor = "#8B8F92";

module.exports = {
    H1Color: 'black',
    H3Color: 'rgb(100,100,100)',
    default: {
        textColor: primaryColor,
        hoverText: '',
        border: '',
        backgroundColor: 'transparent',
        backgroundHover: 'rgba(0,0,0,.08)',
        iconColor: '#8B8F92',
        headerBackgroundColor: '#1565C0'
    },
    primary: {
        textColor: 'white',
        hoverText: '',
        border: '',
        backgroundColor: '#1565C0',
        backgroundHover: '#2d80df',
        iconColor: '#1565C0'
    },
    secondary: {
        textColor: baseTextColor,
        hoverText: '',
        border: '',
        backgroundColor: 'rgba(0,0,0,.2)',
        backgroundHover: 'rgba(0,0,0,.08)',
        iconColor: '#1565C0'
    },
    notification: {
        backgroundColor: 'rgba(0,0,0,.75)'
    },
    switches: {
        borderColor: '#1565C0',
        fillColor: '#1565C0',
        checkImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'512\' height=\'512\'><polygon fill=\'white\' points=\'424 96 184 336 88 240 48 280 184 416 464 136 424 96\'/></svg>")'
    },
    inputs: {
        textColor: baseTextColor,
        underlineColor: primaryColor,
        inactiveUndlerlineColor: inactiveColor,
        inactiveUnderErrorlineColor: inactiveErrorColor,
        underErrorlineColor: errorColor,
        borderColor: borderColor,
        highlightColor: '#eeeeee',
        highlightBorderColor: primaryColor
    }
}
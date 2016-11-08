
let primaryColor = "#3366CC";
let baseTextColor = "#212121";
let secondaryTextColor = "white";
let inactiveColor = "#dbdbdb";
let errorColor = "#DB4437";
let inactiveErrorColor = "#DB8D86";
let secondaryColor = "";
let tertiaryColor = "";
let borderColor = "#8B8F92";
let menuColor = "#2E4151";

module.exports = {
    default: {
        textColor: primaryColor,
        hoverText: '',
        border: '',
        backgroundColor: 'transparent',
        backgroundHover: 'rgba(0,0,0,.08)',
        iconColor: '#8B8F92',
        headerBackgroundColor: '#1565C0',
        activeIcon: "#3366CC",
        inactiveIcon: "#dbdbdb"
},
    primary: {
        textColor: 'white',
        hoverText: '',
        border: '',
        backgroundColor: '#1565C0',
        backgroundHover: '#2d80df',
        iconColor: '#1565C0',
        activeIcon: "#3366CC",
        inactiveIcon: "#dbdbdb"

    },
    secondary: {
        textColor: baseTextColor,
        hoverText: '',
        border: '',
        backgroundColor: 'rgba(0,0,0,.2)',
        backgroundHover: 'rgba(0,0,0,.08)',
        iconColor: '#1565C0',
        activeIcon: "#3366CC",
        inactiveIcon: "#dbdbdb"

    },
    headers: {
        H1Color: 'black',
        H3Color: 'rgb(100,100,100)'
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
    },
    navbar: {
        background: menuColor,
        textColor: secondaryTextColor
    },
    tabmenu: {
        background: primaryColor,
        textColor: secondaryTextColor,
        indicator: '#FFFF8C'
    },
    table: {
        header: {
            backgroundColor: 'transparent',
            border: '#A6A6A6'
        },
        row: {
            border: '#e0e0e0',
            hoverColor: '#f5f5f5',
            zebraStripe: '#f5f5f5'
        }
    }
}
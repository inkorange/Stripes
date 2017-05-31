
let primaryColor = "#3366CC";
let primaryBackground = "#1565C0";
let accentBlue = "#007CB0";
let accentYellow = "#FFD200";
let accentRed = "#ED1C24";
let secondaryBackground = "#dbdbdb";
let baseTextColor = "#212121";
let secondaryTextColor = "white";
let inactiveColor = "#dbdbdb";
let idleColor = "rgba(0, 0, 0, 0.75)";
let errorColor = "#DB4437";
let inactiveErrorColor = "#DB8D86";
let secondaryColor = "";
let tertiaryColor = "";
let borderColor = accentBlue;
let menuColor = "#2E4151";
let inputBackground = "white";

module.exports = {
    default: {
        textColor: primaryColor,
        idleColor: idleColor,
        hoverText: '',
        border: '',
        backgroundColor: 'transparent',
        backgroundHover: 'rgba(0,0,0,.08)',
        iconColor: accentBlue,
        headerBackgroundColor: primaryBackground,
        activeIcon: primaryColor,
        inactiveIcon: inactiveColor
},
    primary: {
        textColor: 'white',
        hoverText: '',
        border: '',
        backgroundColor: primaryBackground,
        backgroundHover: '#2d80df',
        iconColor: primaryBackground,
        headerBackgroundColor: primaryBackground,
        activeIcon: primaryColor,
        inactiveIcon: inactiveColor

    },
    secondary: {
        textColor: baseTextColor,
        hoverText: '',
        border: '',
        backgroundColor: 'rgba(0,0,0,.2)',
        backgroundHover: 'rgba(0,0,0,.08)',
        iconColor: primaryBackground,
        headerBackgroundColor: secondaryBackground,
        activeIcon: "#3366CC",
        inactiveIcon: "#dbdbdb"

    },
    typography: {
        H1Color: 'black',
        H3Color: 'rgb(100,100,100)',
        H2Color: 'rgb(100,100,100)',
        aColor: 'black',
        aHoverColor: primaryBackground
    },
    notification: {
        textColor: baseTextColor,
        borderColor: 'rgb(100,100,100)',
        backgroundColor: 'rgba(0,0,0,.75)',
        tooltipBackgroundColor: 'white'
    },
    switches: {
        textColor: baseTextColor,
        borderColor: primaryBackground,
        fillColor: primaryBackground,
        fillColorSecondary: 'white',
        fillCheckColor: 'white',
        fillCheckColorSecondary: primaryBackground,
        checkImage: (color) => { return 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'512\' height=\'512\'><polygon fill=\''+color+'\' points=\'424 96 184 336 88 240 48 280 184 416 464 136 424 96\'/></svg>")'; }
    },
    inputs: {
        textColor: baseTextColor,
        underlineColor: primaryColor,
        inactiveUndlerlineColor: inactiveColor,
        inactiveUnderErrorlineColor: inactiveErrorColor,
        underErrorlineColor: errorColor,
        borderColor: borderColor,
        highlightColor: '#eeeeee',
        highlightBorderColor: primaryColor,
        inactiveIcon: inactiveColor,
        inputBackground: inputBackground
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
            backgroundColor: 'white',
            border: '#e0e0e0',
            highlight: primaryColor,
            textColor: primaryColor
        },
        row: {
            border: '#e0e0e0',
            hoverColor: '#f5f5f5',
            zebraStripe: '#f5f5f5',
            backgroundColor: 'white'
        }
    }
}
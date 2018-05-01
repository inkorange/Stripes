
let primaryColor = "green";
let primaryBackground = "#347f2e";
let alertBackground = "#FF9800";
let accentBlue = "green";
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

let basePadding = 20;
let baseMargin = 5;
let baseRadius= 2;

var Theme = {
    palette: {
        default: {
            textColor: primaryColor,
            idleColor: idleColor,
            hoverText: '',
            border: '#e0e0e0',
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
            altTextColor: "white",
            borderColor: 'rgb(100,100,100)',
            backgroundColor: 'rgba(0,0,0,.75)',
            alertBackgroundColor: alertBackground,
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
            selectedBackground: primaryColor,
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
    },
    spacing: {
        default: {
            borderRadius: baseRadius,
            padding: basePadding,
            margin: baseMargin,
            menuZIndex: 2000,
            baseFontSize: 1.6
        },
        primary: {
            borderRadius: baseRadius,
            padding: basePadding,
            margin: baseMargin,
            baseFontSize: 1.6,
        },
        secondary: {
            borderRadius: baseRadius,
            padding: basePadding,
            margin: baseMargin,
            baseFontSize: 1.6,
        },
        notification: {
            padding: basePadding,
            zIndex: 2000,
            baseFontSize: 1.4
        },
        switches: {
            padding: basePadding,
            margin: baseMargin,
            borderRadius: baseRadius,
            width: 20,
            height: 20,
            fontSize: '1.6rem',
            errorFontSize: '1.2rem'
        },
        typography: {
            baseFontSize: 1.6,
            padding: basePadding*4,
            margin: baseMargin*4
        },
        inputs: {
            padding: basePadding,
            margin: baseMargin,
            fontSize: '1.8rem',
            errorFontSize: '1.2rem',
            borderRadius: baseRadius,
            underlineHeight: 2,
            dropDownOffset: 0,
            menuZIndex: 2000
        },
        navbar: {
            minHeight: 64,
            padding: basePadding*4,
            fontSize: '1.8rem'
        },
        tabmenu: {
            minHeight: 64,
            padding: basePadding*4,
            fontSize: '1.8rem',
            indicatorHeight: 2
        },
        table: {
            fontSize: '1.5rem',
            header: {
                minHeight: 64 - (basePadding*2)
            },
            cell: {
                fontSize: '1.4rem',
                lineHeight: '1.6rem',
                padding: basePadding*2,
                sortWidth: 10
            },
            row: {
                minHeight: 54
            }
        }
    }
};

module.exports = Theme;
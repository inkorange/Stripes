let Colors = require('./Colors');
let basePadding = 5;
let baseMargin = 5;
let baseRadius= 2;

var Theme = {
    palette: Colors,
    spacing: {
        default: {
            borderRadius: baseRadius,
            padding: basePadding,
            margin: baseMargin,
            menuZIndex: 2000,
            baseFontSize: 1.6,
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
            padding: basePadding
        },
        switches: {
            padding: basePadding,
            margin: baseMargin,
            borderRadius: baseRadius,
            width: 20,
            height: 20
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
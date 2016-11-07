let Colors = require('./Colors');
let basePadding = 5;
let baseMargin = 5;

export default {
    palette: Colors,
    spacing: {
        default: {
            borderRadius: 2,
            padding: basePadding,
            margin: baseMargin,
            menuZIndex: 2000
        },
        primary: {
            borderRadius: 2,
            padding: basePadding,
            margin: baseMargin
        },
        secondary: {
            borderRadius: 2,
            padding: basePadding,
            margin: baseMargin
        },
        notification: {
            padding: basePadding
        },
        switches: {
            padding: basePadding,
            margin: baseMargin,
            borderRadius: 2,
            width: 20,
            height: 20
        },
        headers: {
            baseFontSize: 1.6,
            padding: basePadding*4,
            margin: baseMargin*4
        },
        inputs: {
            padding: basePadding,
            margin: baseMargin,
            fontSize: '1.8rem',
            errorFontSize: '1.2rem',
            borderRadius: 2,
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
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
        inputs: {
            padding: basePadding,
            margin: baseMargin,
            fontSize: '1.8rem',
            errorFontSize: '1.2rem',
            borderRadius: 2,
            underlineHeight: 2
        },
        navbar: {
            minHeight: 64,
            padding: basePadding*4,
            fontSize: '1.8rem'
        }
    }
};
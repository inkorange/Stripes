let Colors = require('./Colors');
let basePadding = 5;
let baseMargin = 5;

export default {
    palette: Colors,
    spacing: {
        default: {
            borderRadius: '2px',
            padding: basePadding,
            margin: baseMargin
        },
        primary: {
            borderRadius: '2px',
            padding: basePadding,
            margin: baseMargin
        },
        secondary: {
            borderRadius: '2px',
            padding: basePadding,
            margin: baseMargin
        },
        notification: {
            padding: basePadding
        }
    }
};
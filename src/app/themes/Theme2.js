
let basePadding = 10;
let baseMargin = 5;

export default {
    palette: {
        H1Color: 'black',
        H3Color: 'rgb(100,100,100)',
        default: {
            textColor: 'green',
            hoverText: '',
            border: '',
            backgroundColor: 'transparent',
            backgroundHover: 'rgba(0,0,0,.08)',
            iconColor: '#8B8F92',
            headerBackgroundColor: 'green'
        },
        primary: {
            textColor: 'white',
            hoverText: '',
            border: '',
            backgroundColor: 'green',
            backgroundHover: '#2d80df',
            iconColor: '#8B8F92'
        },
        secondary: {
            textColor: '',
            hoverText: '',
            border: '',
            backgroundColor: 'rgba(0,0,0,.2)',
            backgroundHover: 'rgba(0,0,0,.08)',
            iconColor: '#8B8F92'
        },
        notification: {
            backgroundColor: 'rgba(0,0,0,.75)'
        },
        switches: {
            borderColor: 'green',
            fillColor: 'rgb(100,200,100)',
            checkImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'512\' height=\'512\'><polygon fill=\'white\' points=\'424 96 184 336 88 240 48 280 184 416 464 136 424 96\'/></svg>")'
        },
        navbar: {
            background: '#2E4151',
            textColor: 'white'
        }
    },
    spacing: {
        default: {
            borderRadius: 5,
            padding: basePadding,
            margin: baseMargin,
        },
        primary: {
            borderRadius: 5,
            padding: basePadding,
            margin: baseMargin
        },
        secondary: {
            borderRadius: 5,
            padding: basePadding,
            margin: baseMargin
        },
        notification: {
            padding: basePadding
        },
        switches: {
            padding: basePadding,
            margin: baseMargin,
            borderRadius: 5,
            width: 30,
            height: 30
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
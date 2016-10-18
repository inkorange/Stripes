
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
            icon: '',
            headerBackgroundColor: 'green'
        },
        primary: {
            textColor: 'white',
            hoverText: '',
            border: '',
            backgroundColor: 'green',
            backgroundHover: '#2d80df',
            icon: ''
        },
        secondary: {
            textColor: '',
            hoverText: '',
            border: '',
            backgroundColor: 'rgba(0,0,0,.2)',
            backgroundHover: 'rgba(0,0,0,.08)',
            icon: ''
        }
    },
    spacing: {
        default: {
            borderRadius: '5px',
            padding: basePadding,
            margin: baseMargin
        },
        primary: {
            borderRadius: '5px',
            padding: basePadding,
            margin: baseMargin
        },
        secondary: {
            borderRadius: '5px',
            padding: basePadding,
            margin: baseMargin
        }
    }
};
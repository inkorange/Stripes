import "whatwg-fetch"
console.warn = () => {return false; }
import { Stripes } from './src/Core/Stripes'

// theme
const theme = require('./www/themes/Theme');
const icons = require('./www/themes/iconLibrary.js');

Stripes({
    palette: theme.palette,
    spacing: theme.spacing,
    icons: icons
});

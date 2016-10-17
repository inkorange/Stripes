import React from 'react';
import { render } from 'react-dom';
import { Stripes } from './Stripes/Core/Stripes'

// layouts
const MainLayout = require('./layouts/MainLayout');

// theme
const theme = require('./themes/Theme');

console.log(theme);
// page components
const StripesDemo = require('./controllers/StripesDemo');

Stripes({
   palette: theme.palette,
   spacing: theme.spacing,
   component: theme.component
});

render((
    <MainLayout>
        <StripesDemo/>
    </MainLayout>
),  document.getElementById('app'));

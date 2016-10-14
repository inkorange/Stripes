import React from 'react';
import { render } from 'react-dom';

// layouts
const MainLayout = require('./layouts/MainLayout');

// page components
const StripesDemo = require('./controllers/StripesDemo');

render((
    <MainLayout>
        <StripesDemo/>
    </MainLayout>
),  document.getElementById('app'));

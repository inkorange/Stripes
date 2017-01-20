import React from 'react';
import { render } from 'react-dom';

import Link from 'react-router/lib/Link'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'
import { Stripes } from '../src/Core/Stripes'

import {NavBar} from '../src/Layouts'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../src/Table'
import {TabularListing} from '../src/Elements/TabularListing'
import { Title, H1, H3 } from '../src/Typography'
import {Icon} from  '../src/Symbols/Icon'

// layouts
const MainLayout = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});

class Sandbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this._setTableState.bind(this)
        };
        this._setTableState = this._setTableState.bind(this);
    }

    componentDidMount() {
    }

    _setTableState() {
        return {
                structure: [
                {
                    width: '150px',
                    name: 'Make',
                    icon: 'alert',
                    field: 'make',
                    filterable: false,
                    sortable: false,
                    className: 'column-notes'
                },
                {
                    name: 'Model',
                    field: 'model',
                    filterable: false,
                    sortable: true
                },
                {
                    name: 'Year',
                    field: 'year',
                    filterable: false,
                    sortable: true
                }
            ],
            rows: [
                {make: 'Ford', model: 'Focus', year: '2005'},
                {make: 'Ford', model: 'Bronco', year: '2001'},
                {make: 'Acura', model: 'TSX', year: '2012'},
                {make: 'Acura', model: 'TLX', year: '2016'},
                {make: 'Toyota', model: 'Camry', year: '2015'},
                {make: 'Toyota', model: 'Corolla', year: '2017'},
                {make: 'Toyota', model: 'Avalon', year: '2010'},
                {make: 'Nissan', model: 'Altima', year: '2008'},
                {make: 'Honda', model: 'CRV', year: '2015'},
                {make: 'Honda', model: 'Accord', year: '2014'}
            ],
            collection: {
                end: 10,
                returned: 10,
                start: 1,
                timestamp: 1484924493000,
                total: 10
            },
            sort_by: "model",
            sort_direction: "desc"
        };
    }

    render() {

        var dataObj = this._setTableState();
        return (
            <div>
                <NavBar ref="NavBar"
                        leftIcon={(
                                    <Icon
                                        color="white"
                                        iconid="menu"
                                        size="medium"
                                        basestyle={{cursor: 'pointer', height: '25px', marginTop: '18px', lineHeight: 0}}
                                    />)}
                        title="This is a NavBar Title"
                        fixed={true}
                >
                    This is my nav bar, hope you enjoy.
                </NavBar>
                <TabularListing
                    data={dataObj}
                    onRowClick={() => {}}
                    onValueClick={() => {}}
                    headerClick={() => {}}
                    sortable={() => {}}
                />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat, purus lacinia aliquam fermentum, sapien odio fringilla justo, vitae euismod leo velit sit amet elit. Nulla facilisi. Sed sagittis egestas mi sed tristique. Phasellus ultrices leo ac tortor viverra, pretium vestibulum felis vehicula. Maecenas sollicitudin mollis orci a venenatis. In hac habitasse platea dictumst. Nam et aliquam tellus. Mauris pulvinar rhoncus lacus sit amet interdum. Fusce dignissim, neque ut dictum fringilla, neque augue pulvinar purus, ac ultricies tortor tellus eget erat.</p>

                    <p>Praesent hendrerit sem lorem, non pulvinar turpis pulvinar ac. Donec est augue, bibendum et efficitur sit amet, vestibulum et ex. Nullam semper metus in risus sodales, id porta mi blandit. Vestibulum commodo sagittis risus eu semper. Nam iaculis, felis in scelerisque aliquet, dui ligula semper elit, at mattis lacus felis sit amet elit. Fusce vehicula libero in ante aliquam, eu consectetur lorem auctor. Morbi pretium lacus id mauris elementum feugiat. Pellentesque dictum, est bibendum mattis maximus, leo mauris viverra lacus, quis ultricies mi turpis a mauris. Integer feugiat lectus eu lacus rhoncus cursus. Pellentesque nibh tortor, aliquet ut erat sed, tristique consequat nisi. Vivamus eget libero eleifend, feugiat eros placerat, sollicitudin lectus. Quisque maximus eu risus sit amet posuere. Sed dignissim aliquam mauris, sit amet lacinia nibh fringilla nec. Cras tincidunt sem eget felis pellentesque, sit amet varius felis vestibulum. Fusce efficitur vulputate eros. Vivamus porttitor ante quis ullamcorper consequat.</p>

                        <p>Nulla dui orci, ultrices in enim id, sodales sodales ipsum. Etiam ac justo maximus, placerat mi id, ultrices mauris. Donec tempor nisi tellus, at placerat elit consectetur eget. Nam at nulla est. Vivamus cursus risus purus, id mattis mauris sodales ut. Donec ac eros eu dolor tempus convallis ut sit amet diam. Aliquam lacinia imperdiet lectus eu tempor. Vivamus facilisis turpis nec commodo tincidunt. Cras facilisis auctor nunc, scelerisque congue purus congue at. Vivamus ut ligula ac purus aliquet finibus. Vivamus posuere ornare nibh sit amet suscipit. Sed eu leo ut sem cursus porta vitae nec neque. Ut id pulvinar ipsum. Pellentesque lacinia, sapien et viverra ultricies, metus ante placerat metus, non rutrum purus neque viverra tellus. Donec euismod justo ac sem laoreet, et consectetur dolor viverra. Duis quis diam posuere, placerat tellus et, ullamcorper turpis.</p>

                            <p>Donec ultrices malesuada ante, tristique auctor magna accumsan eu. Curabitur lobortis nisi tortor, ac pulvinar est luctus at. Fusce consequat placerat ante, sit amet pellentesque justo sagittis quis. Nunc malesuada lorem et ipsum tincidunt luctus. Maecenas facilisis nunc iaculis quam hendrerit, in bibendum velit semper. In non ultricies leo. Nullam convallis neque ac ipsum blandit, at mattis neque aliquet. Fusce tempor ex quis gravida consequat. Donec vitae eros sagittis, cursus tortor ut, dignissim mauris. Pellentesque id interdum libero. Duis in consectetur sem. Fusce id odio vitae massa facilisis gravida sed ac dolor. Aliquam erat volutpat. Nulla eleifend, justo eu mattis scelerisque, leo leo tincidunt massa, id tincidunt ante erat in dui. Mauris odio orci, rhoncus non lacus sed, auctor tincidunt libero. Fusce neque purus, molestie id justo at, tincidunt efficitur sem.</p>

                                <p>Etiam ac nisl congue, scelerisque justo vel, sodales sapien. Ut hendrerit a urna eget mollis. Cras dignissim interdum elit ut auctor. Phasellus aliquam nec magna et ultrices. In at tincidunt tortor, sagittis porta quam. Curabitur molestie nisi in gravida consequat. Aliquam massa mauris, euismod ut nunc nec, bibendum posuere neque.</p>
            </div>
        )

        /*
        return (

            <div>Get to building...</div>
        )
        */
    }
};

// theme
const theme = require('./themes/Theme');
const icons = require('./themes/iconLibrary.js');

Stripes({
    palette: theme.palette,
    spacing: theme.spacing,
    icons: icons
});

render((

    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <IndexRoute component={Sandbox} />
        </Route>
    </Router>

),  document.getElementById('app'));

"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {TabularListing} from 'zebra-stripes/Elements/TabularListing'

export class TabularListingElement extends React.Component {

    constructor(props) {
        super(props);
        this.rowSelection = this.rowSelection.bind(this);
    }

    rowSelection(s) {
        console.log('selected: ', s);
    }

    render() {
        const dataObj = {
            structure: [
                {
                    width: '150px',
                    name: 'Make',
                    icon: 'alert',
                    field: ['make'],
                    filterable: false,
                    sortable: false,
                    className: 'column-notes'
                },
                {
                    name: 'Model',
                    field: ['model'],
                    filterable: false,
                    sortable: true
                },
                {
                    name: 'Year',
                    field: ['year'],
                    filterable: false,
                    sortable: true
                }
            ],
            rows: [
                {make: 'Ford', model: 'Focus', year: '2005'},
                {make: 'Ford', model: 'Bronco', year: '2001'},
                {make: 'Acura', model: 'TSX', year: '2012'},
                {make: 'Acura', model: 'TLX', year: '2016'},
                {make: 'Toyota', model: 'Camery', year: '2015'},
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

        return (
            <ComponentDocumentation
                title="TabularListing"
                location="import {TabularListing} from 'zebra-stripes/Elements/TabularListing';"
                propsMap={[
                    {name: 'bodyHeight',        type: 'string',     desc: 'CSS value that defines the height of the table body. A null value will not force a height.', default: 'null'},
                    {name: 'columnSelector',    type: 'boolean',    desc: 'Toggles the feature to add a column selector widget to the right side of the table rendering.', default: 'false'},
                    {name: 'data',              type: 'Object',     desc: 'A complex data object that contains the table\'s structure, data, and pagination information.', default: 'null'},
                    {name: 'height',            type: 'string',     desc: 'CSS value that defines the height of the full table being rendered. A null value will not force a height on the table.', default: 'null'},
                    {name: 'onRowClick',        type: 'function',   desc: 'Callback function that is fired when the user clicks on a row.', default: '() => { return false;}'},
                    {name: 'onValueClick',      type: 'function',   desc: 'Callback function that is fired when the user clicks a value within a table cell. This is typically used for inline filtering.', default: '() => { return false;}'},
                    {name: 'onHeaderClick',     type: 'function',   desc: 'Callback function when the user clicks the header, this callback is typically used when doing sort handling.', default: '() => { return false;}'},

                    {name: 'rowSelector',       type: 'boolean',    desc: 'Displays checkboxes to the left of each row in the table, and a select all/none option in the header.', default: 'false'},
                    {name: 'rowSelectorKey',    type: 'stirng',     desc: 'The object key to create a map out of the selected rows, on a checkbox click callback, a map of all rows with true/false to represent if it\'s active will be returned.', default: null},
                    {name: 'onRowSelection',    type: 'function',   desc: 'The callback to be executed when a row is selected or deselected. This will return a map of all rows with show/hide values.', default: '() => { return false;}'},


                    {name: 'sortable',          type: 'boolean',    desc: 'Toggle that allows the table to be sortable. This overrides the data structure\'s designation for sorting.', default: 'true'},
                    {name: 'triggerLazyLoad',   type: 'function',   desc: 'Callback function that is fired when the user clicks the summary row at the bottom of the table.', default: '() => { return false;}'},
                    {name: 'showMoreLoading',   type: 'boolean',    desc: 'Toggle to show the summary and \'Show More\' row at the bottom of the table.', default: 'false'},
                    {name: 'showLazyLoading',   type: 'boolean',    desc: 'Toggle to show the lazy loading row at the bottom of te table.', default: 'false'},
                    {name: 'zebraStripes',      type: 'boolean',    desc: 'Will set the colors of the rows to be striped for better readability.', default: 'true'}
                ]}
                colOneWidth="50%"
                colTwoWidth="50%"
                samples={[
                        {
                            desc: 'Default Table Usage',
                            code:
                                'import {TabularListing} from \'zebra-stripes/Elements/TabularListing\'\n' +
                                '\n' +
                                'var dataObj = {\n' +
                                                '   structure: [\n' +
                                                '       {\n' +
                                                '           width: "150px",\n' +
                                                '           name: "Make",\n' +
                                                '           icon: "alert",\n' +
                                                '           field: ["make"],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: false,\n' +
                                                '           className: "column-notes"\n' +
                                                '       },\n' +
                                                '       {\n' +
                                                '           name: "Model",\n' +
                                                '           field: ["model"],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: true\n' +
                                                '       },\n' +
                                                '       {\n' +
                                                '           name: "Year",\n' +
                                                '           field: ["year"],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: true\n' +
                                                '       }\n' +
                                                '   ],\n' +
                                                '  rows: [\n' +
                                                '       {make: "Ford", model: "Focus", year: "2005"},\n' +
                                                '       {make: "Ford", model: "Bronco", year: "2001"},\n' +
                                                '       {make: "Acura", model: "TSX", year: "2012"},\n' +
                                                '       {make: "Acura", model: "TLX", year: "2016"},\n' +
                                                '       {make: "Toyota", model: "Camery", year: "2015"},\n' +
                                                '       {make: "Toyota", model: "Corolla", year: "2017"},\n' +
                                                '       {make: "Toyota", model: "Avalon", year: "2010"},\n' +
                                                '       {make: "Nissan", model: "Altima", year: "2008"},\n' +
                                                '       {make: "Honda", model: "CRV", year: "2015"},\n' +
                                                '       {make: "Honda", model: "Accord", year: "2014"}\n' +
                                                '   ],\n' +
                                                '   collection: {\n' +
                                                '       end: 10,\n' +
                                                '       returned: 10,\n' +
                                                '       start: 1,\n' +
                                                '       timestamp: 1484924493000,\n' +
                                                '       total: 10\n' +
                                                '   },\n' +
                                                '   sort_by: "model",\n' +
                                                '   sort_direction: "desc"\n' +
                                                '};\n\n' +
                                                '<TabularListing\n' +
                                                '    bodyHeight="250px"\n' +
                                                '    data={dataObj}\n' +
                                                '    sortable={true}\n' +
                                                '/>\n',
                            example: (
                                <TabularListing
                                    bodyHeight="250px"
                                    data={dataObj}
                                    sortable={true}
                                />
                            )
                        },
                        {
                            desc: 'TablularListing with ColumnSelector',
                            code:
                                'import {TabularListing} from \'zebra-stripes/Elements/TabularListing\'\n' +
                                '\n' +
                                'var dataObj = {\n' +
                                                '   structure: [\n' +
                                                '       {\n' +
                                                '           width: "150px",\n' +
                                                '           name: "Make",\n' +
                                                '           icon: "alert",\n' +
                                                '           field: ["make"],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: false,\n' +
                                                '           className: "column-notes"\n' +
                                                '       },\n' +
                                                '       {\n' +
                                                '           name: "Model",\n' +
                                                '           field: ["model"],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: true\n' +
                                                '       },\n' +
                                                '       {\n' +
                                                '           name: "Year",\n' +
                                                '           field: ["year"],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: true\n' +
                                                '       }\n' +
                                                '   ],\n' +
                                                '  rows: [\n' +
                                                '       {make: "Ford", model: "Focus", year: "2005"},\n' +
                                                '       {make: "Ford", model: "Bronco", year: "2001"},\n' +
                                                '       {make: "Acura", model: "TSX", year: "2012"},\n' +
                                                '       {make: "Acura", model: "TLX", year: "2016"},\n' +
                                                '       {make: "Toyota", model: "Camery", year: "2015"},\n' +
                                                '       {make: "Toyota", model: "Corolla", year: "2017"},\n' +
                                                '       {make: "Toyota", model: "Avalon", year: "2010"},\n' +
                                                '       {make: "Nissan", model: "Altima", year: "2008"},\n' +
                                                '       {make: "Honda", model: "CRV", year: "2015"},\n' +
                                                '       {make: "Honda", model: "Accord", year: "2014"}\n' +
                                                '   ],\n' +
                                                '   collection: {\n' +
                                                '       end: 10,\n' +
                                                '       returned: 10,\n' +
                                                '       start: 1,\n' +
                                                '       timestamp: 1484924493000,\n' +
                                                '       total: 10\n' +
                                                '   },\n' +
                                                '   sort_by: "model",\n' +
                                                '   sort_direction: "desc"\n' +
                                                '};\n\n' +
                                                '<TabularListing\n' +
                                                '    bodyHeight="250px"\n' +
                                                '    columnSelector={true}\n' +
                                                '    data={dataObj}\n' +
                                                '    sortable={true}\n' +
                                                '/>\n',
                            example: (
                                <TabularListing
                                    bodyHeight="250px"
                                    columnSelector={true}
                                    data={dataObj}
                                    sortable={true}
                                />
                            )
                        },
                        {
                            desc: 'TablularListing with Row Selection',
                            code:
                            'import {TabularListing} from \'zebra-stripes/Elements/TabularListing\'\n' +
                            '\n' +
                            'var dataObj = {\n' +
                            '   structure: [\n' +
                            '       {\n' +
                            '           width: "150px",\n' +
                            '           name: "Make",\n' +
                            '           icon: "alert",\n' +
                            '           field: ["make"],\n' +
                            '           filterable: false,\n' +
                            '           sortable: false,\n' +
                            '           className: "column-notes"\n' +
                            '       },\n' +
                            '       {\n' +
                            '           name: "Model",\n' +
                            '           field: ["model"],\n' +
                            '           filterable: false,\n' +
                            '           sortable: true\n' +
                            '       },\n' +
                            '       {\n' +
                            '           name: "Year",\n' +
                            '           field: ["year"],\n' +
                            '           filterable: false,\n' +
                            '           sortable: true\n' +
                            '       }\n' +
                            '   ],\n' +
                            '  rows: [\n' +
                            '       {make: "Ford", model: "Focus", year: "2005"},\n' +
                            '       {make: "Ford", model: "Bronco", year: "2001"},\n' +
                            '       {make: "Acura", model: "TSX", year: "2012"},\n' +
                            '       {make: "Acura", model: "TLX", year: "2016"},\n' +
                            '       {make: "Toyota", model: "Camery", year: "2015"},\n' +
                            '       {make: "Toyota", model: "Corolla", year: "2017"},\n' +
                            '       {make: "Toyota", model: "Avalon", year: "2010"},\n' +
                            '       {make: "Nissan", model: "Altima", year: "2008"},\n' +
                            '       {make: "Honda", model: "CRV", year: "2015"},\n' +
                            '       {make: "Honda", model: "Accord", year: "2014"}\n' +
                            '   ],\n' +
                            '   collection: {\n' +
                            '       end: 10,\n' +
                            '       returned: 10,\n' +
                            '       start: 1,\n' +
                            '       timestamp: 1484924493000,\n' +
                            '       total: 10\n' +
                            '   },\n' +
                            '   sort_by: "model",\n' +
                            '   sort_direction: "desc"\n' +
                            '};\n\n' +
                            '<TabularListing\n' +
                            '    bodyHeight="250px"\n' +
                            '    columnSelector={true}\n' +
                            '    data={dataObj}\n' +
                            '    sortable={true}\n' +
                            '    rowSelector={true}\n' +
                            '    rowSelectorKey="model"\n' +
                            '    onRowSelection={this.rowSelection}\n' +
                            '/>\n',
                            example: (
                                <TabularListing
                                    bodyHeight="250px"
                                    columnSelector={true}
                                    data={dataObj}
                                    sortable={true}
                                    rowSelector={true}
                                    rowSelectorKey="model"
                                    onRowSelection={this.rowSelection}
                                />
                            )
                        }
                    ]}
                    description={[
                        <p key="p1">Table components can take a collection of TableHeaderRow, with TableHeaderCells along with an array of TableRows with TableCell components within.</p>
                    ]}
            />
        )
    }
}

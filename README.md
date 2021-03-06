
# UI Component Library Design System: An Easily Re-Usable Web Component Architecture Built on ReactJS.

This library is an extension of the ReactJS library, and written with minimal library dependencies. The components are written in ES6 Class patterns. This web component architecture promotes the design system approach called Atomic Design.

This project contains both the source files to build out an NPM package for re-usability across other applications, as well as a live style guide based on the package built from source.

# Dependencies

Node v6.x and npm v.5.4.2 are required for this project.

Be sure to install gulp globally before running build scripts.

# Structure of the Project

The project has 2 main folders, /examples and /pkg. The /examples folder houses a ReactJS app that demonstrates code samples, implementation examples, and property definitions of the current Stripes release. This build is not connected to the source file, and is only configured to render the Zebra Stripes library through an NPM installation, which is configured in the package.json file.

package.json:
```
"devDependencies": {
   ...
    "zebra-stripes": "file:zebra-stripes-0.3.0.tgz"
  },
```

# Building and Running the Live Style Guide

To run the project for the first time, simply go to the /examples root directory, run:
```
npm install
```
then
```
gulp buildandrun
```

The buildandrun script will spool up a web server on localhost:3010.

# Setting Up the Sandbox for Stripes Development 

This project also handles new development and contributions to the library, and in doing so, exposes a simple app to do development of new components in.
 
All configurations are simplified to be called from the app.jsx file located in /pkg/www folder.

To spool up a web server for the first time, go to the /pkg folder and run:

```
npm install
```
then
```
gulp buildandrun
```

# Building the NPM Package

Once a new component is tested and linted, we need to package the project into a tarball file. We do this by going to the /pkg root directory and executing:
```
gulp buildpack
```

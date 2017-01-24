![Zebra Stripes](zstripes.png?raw=true)
# Stripes
A ReactJS-based Design System for Zebra Technologies, leveraging the web component architecture and borrowing design philosophy for Atomic Design principles.

This project contains both the source files to build out an NPM package for re-usability across other applications, as well as a live style guide based on the tarball built form the src.

# Structure of the Project

The project has 2 main folders, /examples and /pkg. The /examples folder houses a ReactJS build that demonstrates the currently build Stripes NPM package. This build is not connected to the source file, and is only configured to render the Zebra Stripes library through an NPM installation, which is configured in the package.json file.

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

Step 1: Compile Module
Once a new component is tested and linted, we need to package the project into a tarball file. We do this by going to the /pkg root directory and executing:
```
gulp buildpack
```
 
This will transpile the ES6 codebase to be used in web projects, and builds them to the /lib folder.
 
Step 2: Bundling the module
To build the tarball file, run the following command from the /pkg folder:
```
npm pack lib
```

# Contribution Etiquette

coming soon....
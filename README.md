# "Project Catwalk" - Ascent Squad

## Background

*Project Catwalk* is the Frontend Capstone project for the Hack Reactor software engineering immersive program.

This repo contains the submission for **Ascent Squad**, a team consisting of the following developers:

- Sam Pool
- Fanno Chea
- Yunfan Gao

These three developers were given roughly 2.5 weeks to build out the front end of the product view of an ecommerce portal from scratch according to a Business Requirements document and a design document.

---

### The API

Included in this assignment was a provided API with multiple endpoints which respond to requests with varying types of information - general product info, product styles, questions & answers, and ratings & reviews.

The responsibility of Ascent Squad was to harness this provided API to build out a fully functioning product view frontend.

---

## Primary Technologies

This project was built using the following primary technologies

- ReactJS
  - Frontend javascript framework used to build the user interface.
- Babel
  - Transpilation package used to convert ReactJS-specific syntax into browser-consumable JavaScript.
- Webpack.
  - Bundling package used to bundle javascript modules and component-focused stylesheets into ```.js``` and ```.css``` bundles for browser comsumption.
- NodeJS + ExpressJS
  - Backend javascript framework used to build a basic server for serving static files and making authenticated API requests on behalf of the client.
- Jest + React-Testing-Library
  - Testing framework and library used for unit tests, integration tests, and end-to-end tests.

---

## Installation

Steps for getting started as a developer on this repo:

1. Clone this repo onto your local machine:
    - ```git clone https://github.com/ascentSquad/projCatwalk.git```
2. ```cd``` into the repo's root directory
3. Install the project's depencies:
    - ```npm install```
4. Start developing!

---

## Provided Scripts

- ```npm run react-dev```
  - bundles the contents of the ```src/``` directory (also transpiling JavaScript as needed for browser consumption) into bundled ```.js``` and ```.css``` files which are linked into the ```index.html``` page, then __watches for changes and re-bundles on each file change.__
- ```npm run react-server```
  - starts a development server which serves the client app from localhost - be default on ```localhost:3000``` - then __watches for changes and restarts the server with updated content on each file change__.


---

## Project Structure


- ```client/```
  - files related to the ReactJS client application
  - ```dist/```
    - static bundled and transpiled files to be served as the client application
  - ```src/```
    - source files for the client application
    - ```components/```
      - ReactJS component files (```.jsx```) and their associated style sheets (```.css```) and jest test suites (```.test.js```), organized by component.
    - ```contexts/```
      - files related to app state management, handled by ReactJS' context feature.
    - ```dummyData/```
      - data matching the shape and content returned from the various API calls for use in development and testing.
    - ```App.jsx```
      - The parent client application component which renders all child components.
    - ```App.test.jsx```
      - tests for the parent app component - the bulk of the app's tests are dispersed throughout the ```components/``` directory structure, organized by the component they test.
    - ```index.js```
      - the root JavaScript file of the webpack bundle - imports the ```App.jsx``` file and injects it into the ```/client/dist/index.html``` page.

- ```server/```
  - files for the minimal ExpressJS server application (API exists   seperately)
- ```.vscode/```
  - shared editor settings for VS Code

- etc...
  - config files for webpack, babel, jest, etc

---

## The "Widgets"

Apart from the overall architecture of the app, which was developed as a group effort, the app content was split into three "widgets", each of which was tackled by a specific developer, as a way of dividing the work.

The three widgets and their developers (in the order they appear in app) are as follows:

- Product Overview
  - Sam Pool
- Questions & Answers
  - Yunfan Gao
- Ratings & Reviews
  - Fanno Chea

---

### Product Overview
- Developer: Sam Pool

The Product Overview widget is the featured "above-the-fold" component showcasing the current product. The primary sub-components of this widget are as follows:

- Img Gallery
  - Displays images of the current product in the style currently selected (see below - Style Selector).
  - Includes navigation arrows to flip through images one at a time
  - Includes thumbnail carousel, an alternate option for navigating through the images
- Style Selector
  - Allows the user to select different styles for a given product - variations in color, etc.
  - Displays available styles as a list of thumbnails which can be selected from.
- Size selector
  - Allows the user to select a size for the current product.
  - sizes are dependent on the sizes in stock for the selected style.
- Quantity Selector
  - Allows the user to select a quantity of the current product.
  - Quantities are dependant on quantities currently in stock for selected style and size.
- Add To Cart
  - Allows the user to add the selected quantity of this product in selected style and size to their shopping cart - accomplished through a POST request to the independent API.
---

### Questions & Answers
- Developer: Yunfan Gao

---

### Ratings & Reviews
- Developer: Fanno Chea

---


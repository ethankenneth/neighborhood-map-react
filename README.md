<!-- A README file is included detailing all steps required to successfully run the application -->
# Neighborhood Map React Project

## How to run the project
To run the project in the **development mode**:
Download or clone the repository in your computer:
In the repository folder:
* install project dependencies with
npm install axios --save
npm install react-burger-menu --save
npm install escape-string-regexp --save
* start the development server with
npm start
* open [http://localhost:3000](http://localhost:3000) to view in your browser

To run the project in the **build mode**, follow the instructions below.<br>
Run:
npm run build

* Using a **static server**
Using Node (https://nodejs.org/):
Install [serve](https://github.com/zeit/serve)
Run the commands:
sh
npm install -g serve
serve -s build
Open **[http://localhost:5000](http://localhost:5000)** to run the **production build**

Please note that the **Service Worker** providing offline capabilities works only in the **production build**

## Credits & Helpful Links
Google Maps API https://developers.google.com/maps/documentation/javascript/events
Places API by FourSquare https://developer.foursquare.com/docs/api/venues/explore
Create React https://github.com/facebookincubator/create-react-app
React Error Boundaries https://reactjs.org/docs/error-boundaries.html

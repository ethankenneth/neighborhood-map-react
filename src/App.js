// Proper Use of React
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MenuComponent from './MenuComponent';
import ErrorBoundary from './ErrorBoundary';
import SearchBar from './SearchBar';
import escapeRegExp from 'escape-string-regexp';
import Header from './Header';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      markers: [],
      showVenues: [],
      query: '',
      notVisibleMarkers: []
  }}// End this.state

  componentDidMount() {
    this.getVenues()
  }// End componentDidMount

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDg4dxHC41FyCIt9tsPJeBj_xfrxkMUd44=3&callback=initMap")
    window.initMap = this.initMap;
  }// End renderMap

// Application utilizes at least one non-Google third-party API
// https://developer.foursquare.com/docs/api/venues/explore
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "M1AXAREEAJSHADKPSOPUZ0SXNHY0KLLYURPKNC4OYBZ4QWMD",
      client_secret: "KR3AFV2GDXKNCAC2IUWGIAX2KSBPLTKOGERGL0FRF524YQFU",
      query: "sights",
      ll: "40.7413549,-73.9980244",
      v: "20181808",
      limit: 5
    }// End const parameters

// Reference: https://github.com/axios/axios
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items,
        showVenues: response.data.response.groups[0].items
      }, this.renderMap())
    })// End then
    .catch(error => {
      alert(`Sorry, fetching data from Foursquare was not possible!`)
      console.log("Foursquare error! " + error)
    })// End catch
  }// End getVenues

// Map and Markers
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 14
    })// End var map

// Additional Location Data
// Functionality providing additional data about a location is provided and sourced from a 3rd party API. Information can be provided either in the marker’s infoWindow, or in an HTML element in the DOM (a sidebar, the list view, a modal, etc.)
    const infowindow = new window.google.maps.InfoWindow({
      maxWidth: 180
    })// End const infowindow

    this.infowindow = infowindow

    this.state.venues.map(myVenue => {

// Reference: https://developers.google.com/maps/documentation/javascript/infowindows
      const contentString = `<b>${myVenue.venue.name}</b> <br><i>${myVenue.venue.location.address}</i>
      <br><br><i>Data provided by Foursquare.</i>`

// Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.)
      const marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name
      })// End const marker

        this.state.markers.push(marker)

// Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.)
// Credit Professor Zuli Northampton Web Animation course
      function animationEffect() {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(function(){ marker.setAnimation(null) }, 550)
      }// End function animationEffect

// Clicking a marker displays unique information about a location somewhere on the page (modal, separate div, inside an infoWindow).
      function openMarker() {
        infowindow.setContent(contentString)
        animationEffect()

        infowindow.open(map, marker)
      }

      marker.addListener('click', function() {
        openMarker()
      })// End click
    }// End this.state.venues.map
  )
}// End initMap

  updateQuery = query => {
    this.setState({ query })
    this.state.markers.map(marker => marker.setVisible(true))
    let filterVenues
    let notVisibleMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      filterVenues = this.state.venues.filter(myVenue =>
        match.test(myVenue.venue.name)
      )
      this.setState({ venues: filterVenues })
      notVisibleMarkers = this.state.markers.filter(marker =>
        filterVenues.every(myVenue => myVenue.venue.name !== marker.title)
      )

      notVisibleMarkers.forEach(marker => marker.setVisible(false))

      this.setState({ notVisibleMarkers })
    } else {
      this.setState({ venues: this.state.showVenues })
      this.state.markers.forEach(marker => marker.setVisible(true))
    }// End else
  }// End updateQuery

// Site elements are defined semantically
  render() {
    if (this.state.hasError) {
      return <div id="Error-message" aria-label="Error message">Sorry, something went wrong!</div>
    } else {
      return (
      <main>
        <ErrorBoundary>
        <div id="header" aria-label="Header">
          <Header />
        </div>
        <div id="SearchBar" aria-label="Search Bar">
          <SearchBar
            venues={ this.state.showVenues }
            markers={ this.state.markers }
            filteredVenues={ this.filteredVenues }
  	      	query={this.state.query}
            clearQuery={this.clearQuery}
	        	updateQuery={b => this.updateQuery(b)}
	        	clickLocation={this.clickLocation}
          />
        </div>
        <div id="container" aria-label="Menu Container">
          <MenuComponent
            venues={ this.state.venues }
            markers={ this.state.markers }
          />
        </div>
        <div id="map" aria-label="Map" role="application">
        </div>
        </ErrorBoundary>
      </main>
    );
  }// End else
}// End render
}// End class App extends Component

function loadScript(url) {
  let index  = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  script.onerror = function() {
    alert("Error loading map! Check the URL!");
  };// End script.onerror
}// End function loadScript


export default App;

// Proper Use of React
import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './MenuComponent.css';

class MenuComponent extends Component {

  openMarker = locationName => {
    this.props.markers.map(marker => {
      if (marker.title === locationName) {
        window.google.maps.event.trigger(marker, "click")
      }// End if
    })// End this.props.markers
  }// End openMarker

// Site elements are defined semantically
// Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate ARIA roles are defined
  render () {
    return (
      <Menu width={ '25%' } isOpen noOverlay >
        <div className="listOfVenues" aria-label="List of Venues">
        {this.props.venues.map(myVenue => (
            <li role="menuitem"
              onClick={() => {
                this.openMarker(myVenue.venue.name);
              }}
              aria-label={myVenue.venue.name}
              tabIndex="0"
              id={myVenue.venue.id}
              key={myVenue.venue.id}
            >
              <br/>
              <b>{myVenue.venue.name}</b>
              <br/>
              <i>{myVenue.venue.location.address}</i>
            </li>
          ))}
          <p>
            <i>Data fetched from Foursquare</i>
          </p>
          </div>
      </Menu>
    );
  }// End render
}// End class MenuComponent extends Component

export default MenuComponent

// Proper Use of Reach
import React, { Component } from 'react'

// Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection
// Focus
// Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus
class SearchBar extends Component {

  render() {
      return (
        <div className="locationsFilter" role="application">
          <input
          type="text"
          autoFocus
          id="query-Filter"
          placeholder="Search..."
          aria-label="Locations filter"
          value={this.props.query}
          onChange={event => this.props.updateQuery(event.target.value)}
          />
        </div>
      );
    }// End render
}// End class SearchBar extends Component


export default SearchBar;

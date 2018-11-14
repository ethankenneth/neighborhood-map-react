// Proper Use of React
import React from "react";

// Site elements are defined semantically
// Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate ARIA roles are defined
const Header = () => (
  <div id="Top-Header" aria-label="Header" tabIndex='0'>
    <h3>New York, New York</h3>
  </div>
);

export default Header;

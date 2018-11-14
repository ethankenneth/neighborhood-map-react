// Proper Use of React
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }// End constructor(props)

    componentDidCatch(error, info) {
      this.setState({ hasError: true });
    }// End componentDidCatch

    render() {
      if (this.state.hasError) {
        return <h1>Sorry, something went wrong.</h1>;
      }// End if
      return this.props.children;
    }// End render
  }// End class ErrorBoundary extends Component

export default ErrorBoundary

import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './components/Navbar';
import './index.css';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Navbar />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

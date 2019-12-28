import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import Form from './components/Form';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';

import 'bootswatch/dist/cosmo/bootstrap.min.css';
import './index.css';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Navbar />
        <SearchSection />
        <main>
          <Form />
        </main>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

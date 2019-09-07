import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';

import Analytics from './components/Analytics';
import Search from './components/Search';
import Settings from './components/Settings';
import SideBar from './components/SideBar';

export default class App extends React.Component {

  public render = (): JSX.Element => {
    return (
      <Router>
        <SideBar />
        <main>
          <Route exact={true} path="/" component={Search} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/search" component={Search} />
          <Route path="/settings" component={Settings} />
        </main>
      </Router>
    );
  };
}

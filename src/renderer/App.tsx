import React from 'react';

import SideBar from './components/SideBar';

export default class App extends React.Component {

  public render = (): JSX.Element => {
    return (
      <>
        <SideBar />
      </>
    );
  };
}

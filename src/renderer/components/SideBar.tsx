import React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

interface ISideBarState {
  selectedKey: string,
}

export default class SideBar extends React.Component<any, ISideBarState> {

  constructor(props: any) {
    super(props);
    this.state = { selectedKey: 'search' };
  }

  private _onLinkClick = (_?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (item && item.key) {
      this.setState({ selectedKey: item.key });
    }
  };

  public render = (): JSX.Element => {
    return (
      <Nav
        groups={[
          {
            links: [
              {
                icon: 'Search',
                key: 'search',
                name: 'Search',
                url: '',
              },
              {
                icon: 'AnalyticsView',
                key: 'analytics',
                name: 'Analytics',
                url: '',
              },
              {
                icon: 'Settings',
                key: 'settings',
                name: 'Settings',
                url: '',
              }
            ]
          }
        ]}
        onLinkClick={this._onLinkClick}
        selectedKey={this.state.selectedKey}
      />
    );
  };
};

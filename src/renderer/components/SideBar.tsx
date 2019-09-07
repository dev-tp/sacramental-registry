import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { withRouter } from 'react-router-dom';
import React from 'react';

interface ISideBarState {
  selectedKey: string,
}

class _SideBar extends React.Component<any, ISideBarState> {

  constructor(props: any) {
    super(props);
    this.state = { selectedKey: 'search' };
  }

  // https://github.com/OfficeDev/office-ui-fabric-react/issues/915
  private _onLinkClick = (mouseEvent?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    mouseEvent!.preventDefault();

    if (item && item.key) {
      this.setState({ selectedKey: item.key });
      this.props.history.push(item.url);
    }

    return false;
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
                url: '/search',
              },
              {
                icon: 'AnalyticsView',
                key: 'analytics',
                name: 'Analytics',
                url: '/analytics',
              },
              {
                icon: 'Settings',
                key: 'settings',
                name: 'Settings',
                url: '/settings',
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

const SideBar = withRouter(_SideBar);
export default SideBar;

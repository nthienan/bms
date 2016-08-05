import React from "react";
import {Link} from "react-router";
import AppBar from "material-ui/AppBar";
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <nav>
          <AppBar
            title="BMS Application"
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Refresh"/>
                <MenuItem primaryText="Help"/>
                <MenuItem primaryText="Sign out"/>
              </IconMenu>
            }/>

        </nav>
      </header>
    );
  }
}

export default Header;
